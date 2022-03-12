import { Octokit } from '@octokit/rest'
import { OctokitResponse } from '@octokit/types'
import { getResponseCache, setResponseCache } from '../../cachedFetch'

type OctokitPlugin = Parameters<typeof Octokit.plugin>[0]
const requestCaching: OctokitPlugin = (octokit) => {
  // hook into the request lifecycle
  octokit.hook.wrap('request', async (request, options) => {
    /**
     * GitHub client saves paths as things like /repos/{owner}/{repo}/contributors
     * And we need to ensure our caching is unique per request.. so we need to interpolate the github request path
     * with the passed arguments in the options object
     */

    let path = options.url
    path.match(/(?<=\{)[^}]+/g)?.forEach((arg: string) => {
      path = path.replace(`{${arg}}`, options[arg] as string)
    })

    const cacheKey = `${options.baseUrl}${path}`
    const cachedResponse = await getResponseCache(cacheKey)

    if (cachedResponse != null) {
      return (
        (await cachedResponse
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .json()) as unknown as OctokitResponse<any, number>
      )
    }
    const response = await request(options)

    await setResponseCache(cacheKey, response)

    return response
  })
}

export { requestCaching }
