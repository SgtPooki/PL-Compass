import fetchPonyFill from 'fetch-ponyfill'
import { TokenBucketLimiter } from '@dutu/rate-limiter'

const { fetch } = fetchPonyFill()
const EXPIRE_MIN = 1440 // one whole day

const hostnameLimiters = new Map<string, RateLimiter>()

// const defaultRateLimiter = new TokenBucketLimiter({
//   bucketSize: 1,
//   tokensPerInterval: 1,
//   interval: 1000 * 1,
//   stopped: false,
// })
// hostnameLimiters.set('default', defaultRateLimiter)

type CachedFetchOptions =
  | (Parameters<typeof fetch>[1] & {
      seconds?: number
    })
  | number

/**
 * Taken originally from https://www.sitepoint.com/cache-fetched-ajax-requests/
 */
const cachedFetch = async (
  url: string,
  options?: CachedFetchOptions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  // const { url, options } = args
  let expiry = EXPIRE_MIN * 60
  if (typeof options === 'number') {
    expiry = options
    options = undefined
  } else if (typeof options === 'object') {
    // I hope you didn't set it to 0 seconds
    expiry = options.seconds || expiry
  }
  const { hostname } = new URL(url)

  // one call per second per hostname
  let limiter = new TokenBucketLimiter({
    bucketSize: 1,
    tokensPerInterval: 1,
    interval: 1000 * 1,
    stopped: false,
  })
  if (!hostnameLimiters.has(hostname)) {
    hostnameLimiters.set(hostname, limiter)
  } else {
    limiter = hostnameLimiters.get(hostname)
  }
  // Use the URL as the cache key to sessionStorage
  const cacheKey = url
  const cached = localStorage.getItem(cacheKey)
  const whenCached = localStorage.getItem(cacheKey + ':ts')
  if (cached !== null && whenCached !== null) {
    // it was in sessionStorage! Yay!
    // Even though 'whenCached' is a string, this operation
    // works because the minus sign converts the
    // string to an integer and it will work.
    const age = (Date.now() - Number(whenCached)) / 1000
    if (age < expiry) {
      const response = new Response(new Blob([cached]))
      return Promise.resolve(response)
    } else {
      // We need to clean up this old key
      localStorage.removeItem(cacheKey)
      localStorage.removeItem(cacheKey + ':ts')
    }
  }
  await limiter.awaitTokens(1)
  const haveToken = await limiter.tryRemoveTokens(1)
  if (!haveToken) {
    // Should not happen often
    console.error('Awaited token, but did not have one', url)
    return cachedFetch(url, options)
  }

  return fetch(url, options).then((response) => {
    // let's only store in cache if the content-type is
    // JSON or something non-binary
    if (response.status === 200) {
      const ct = response.headers.get('Content-Type')
      if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
        // There is a .json() instead of .text() but
        // we're going to store it in sessionStorage as
        // string anyway.
        // If we don't clone the response, it will be
        // consumed by the time it's returned. This
        // way we're being un-intrusive.
        response
          .clone()
          .text()
          .then((content) => {
            localStorage.setItem(cacheKey, content)
            localStorage.setItem(cacheKey + ':ts', Date.now().toString())
          })
      }
    }
    return response
  })
}

export { cachedFetch }
