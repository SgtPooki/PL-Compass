// https://api.github.com/rate_limit
import { memoize } from 'lodash'
import { getClient } from './getClient'

const getRateLimit = memoize(
  async (githubToken = localStorage.getItem('githubToken') ?? undefined) => {
    // https://api.github.com/repos/scala/scala/contributors?q=contributions&order=desc
    // https://stackoverflow.com/questions/48874412/github-api-how-to-get-the-top-contributors-sorted-for-a-given-repository
    // const url = 'https://api.github.com/rate_limit'

    const client = getClient(githubToken)

    try {
      return await client
        .request('GET /rate_limit')
        .then((result) => result.data)
    } catch (err) {
      return null
    }
  }
)

export { getRateLimit }
