import fetchPonyFill from 'fetch-ponyfill'
import { TokenBucketLimiter } from '@dutu/rate-limiter'
import { OctokitResponse, ResponseHeaders } from '@octokit/types'
import { getClient } from './github/getClient'

import localForage from 'localforage'
const { fetch } = fetchPonyFill()
const DEFAULT_EXPIRY_SECONDS = 60 * 60 * 24 // one whole day

const hostnameLimiters = new Map<string, RateLimiter>()

hostnameLimiters.set(
  'api.github.com',
  new TokenBucketLimiter({
    bucketSize: 1,
    tokensPerInterval: 1,
    interval: 1000 * 60, // 1 token every minute
    stopped: false,
  })
)
hostnameLimiters.set(
  'ecosystem-dashboard.com',
  new TokenBucketLimiter({
    bucketSize: 1,
    tokensPerInterval: 1,
    interval: 1000 * 0.5,
    stopped: false,
  })
)
hostnameLimiters.set(
  'libp2p.ecosystem-dashboard.com',
  new TokenBucketLimiter({
    bucketSize: 1,
    tokensPerInterval: 1,
    interval: 1000 * 0.5,
    stopped: false,
  })
)
hostnameLimiters.set(
  'filecoin.ecosystem-dashboard.com',
  new TokenBucketLimiter({
    bucketSize: 1,
    tokensPerInterval: 1,
    interval: 1000 * 0.5,
    stopped: false,
  })
)

type CachedFetchOptions = Parameters<typeof fetch>[1] & {
  expiry?: number
  limiter?: typeof TokenBucketLimiter
  requestFn?: () => Promise<
    Response | ReturnType<ReturnType<typeof getClient>['request']>
  >
}

// one call per second per hostname
const getDefaultRateLimiter = () => {
  const limiter = new TokenBucketLimiter({
    bucketSize: 1,
    tokensPerInterval: 1,
    interval: 1000 * 1,
    stopped: false,
  })

  limiter.isDefault = true

  return limiter
}
/**
 * Taken originally from https://www.sitepoint.com/cache-fetched-ajax-requests/
 */
const cachedFetch = async (
  url: string,
  options: CachedFetchOptions = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const cachedResponse = await getResponseCache(url, options.expiry)
  if (cachedResponse != null) {
    return cachedResponse
  }
  // const { url, options } = args
  const { hostname } = new URL(url)
  let { limiter } = options

  if (limiter == null) {
    // no limiter provided.. use saved hostname limiter, or default limiter
    limiter = hostnameLimiters.get(hostname) ?? getDefaultRateLimiter()
  } else if (!hostnameLimiters.has(hostname)) {
    // limiter was provided, if the hostname doesn't already have a limiter, set it.
    hostnameLimiters.set(hostname, limiter)
  }

  if (limiter.isStopped) {
    return {
      json: () => [] as GitHub.RepoContributor[],
    }
    // throw new Error('Limiter was stopped due to 403 (rate limiting?)')
  }
  await limiter.awaitTokens(1)
  const haveToken = await limiter.tryRemoveTokens(1)
  if (!haveToken) {
    // Should not happen often
    console.error('Awaited token, but did not have one', url)
    return cachedFetch(url, options)
  }

  if (url.match(/github/)) {
    const headers = (options.headers ?? new Headers()) as Headers
    const token = localForage.getItem('githubToken')
    headers.set('Authorization', `token ${token}`)
    options.headers = headers
    options.method = 'GET'
  }
  return fetch(url, options).then(async (response) => {
    await setResponseCache(url, response.clone())
    if (response.status === 403) {
      limiter.stop()
    } else if (!response.ok) {
      limiter.stop()
    }
    return response
  })
}

const getResponseCache = async (
  url: string,
  expiry = DEFAULT_EXPIRY_SECONDS
) => {
  // const expiry = options.expiry ??
  // const cacheKey = url
  const cached = await localForage.getItem<BlobPart>(url)

  const whenCached = await localForage.getItem<string>(url + ':ts')

  //
  //
  if (cached !== null && whenCached !== null) {
    // it was in sessionStorage! Yay!
    // Even though 'whenCached' is a string, this operation
    // works because the minus sign converts the
    // string to an integer and it will work.
    const age = (Date.now() - Number(whenCached)) / 1000

    if (age < expiry) {
      const response = new Response(new Blob([cached]))

      return response
    } else {
      // We need to clean up this old key
      await localForage.removeItem(url)
      await localForage.removeItem(url + ':ts')
    }
  }
  return null
}

const setResponseCache = async (
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: Response | OctokitResponse<any, number>
) => {
  if ([200, 404].includes(response.status)) {
    let ct: string | undefined
    if (typeof response.headers?.get === 'function') {
      ct = response.headers.get('Content-Type') as string
    } else {
      ct = (response.headers as ResponseHeaders)['content-type'] as
        | string
        | undefined
    }

    try {
      // let's only store in cache if the content-type is
      // JSON or something non-binary
      if (ct?.match(/json/i) || ct?.match(/text\//i)) {
        // There is a .json() instead of .text() but
        // we're going to store it in sessionStorage as
        // string anyway.
        // If we don't clone the response, it will be
        // consumed by the time it's returned. This
        // way we're being un-intrusive.
        if (typeof (response as Response).clone === 'function') {
          ;(response as Response)
            .clone()
            .text()
            .then(async (content: string) => {
              await localForage.setItem(url, content)
              await localForage.setItem(url + ':ts', Date.now().toString())
            })
        } else {
          const githubCacheData = JSON.stringify(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            response as OctokitResponse<any, number>
          )

          await localForage.setItem(url, githubCacheData)
          await localForage.setItem(url + ':ts', Date.now().toString())
        }
      } else {
        console.error('content type didnt match...', ct)
      }
    } catch (err) {
      console.error('Could not store response cache', response)
      console.error(err)
    }
  }
}

export { cachedFetch, getResponseCache, setResponseCache }
