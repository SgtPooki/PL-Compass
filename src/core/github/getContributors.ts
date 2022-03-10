import { cachedFetch } from '../cachedFetch'
import { TokenBucketLimiter } from '@dutu/rate-limiter'

/**
 * TODO: Need to prevent rate-limiting if we're going to use cache
 */
const limiter = new TokenBucketLimiter({
  bucketSize: 1,
  tokensPerInterval: 1,
  interval: 1000 * 1,
  stopped: false,
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getContributors = async (repoName: string): Promise<any> => {
  // https://api.github.com/repos/scala/scala/contributors?q=contributions&order=desc
  // https://stackoverflow.com/questions/48874412/github-api-how-to-get-the-top-contributors-sorted-for-a-given-repository
  const url = `https://api.github.com/repos/${repoName}/contributors?q=contributions&order=desc`
  await limiter.awaitTokens(1)
  const haveToken = await limiter.tryRemoveTokens(1)
  if (!haveToken) {
    return getContributors(repoName)
  }
  const response = await cachedFetch(url)

  const json = await response.json()
  console.log(`getContributors json: `, json)

  return json
}

export { getContributors }
