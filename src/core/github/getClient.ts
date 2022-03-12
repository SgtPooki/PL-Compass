/* eslint-disable @typescript-eslint/no-explicit-any */
import { Octokit } from '@octokit/rest'
import { throttling } from '@octokit/plugin-throttling'
import { retry } from '@octokit/plugin-retry'
import { requestCaching } from './plugins/requestCaching'

const octokitWithPlugins = Octokit.plugin(throttling, retry, requestCaching)
const getClient = (
  token = localStorage.getItem('githubToken') ?? undefined
) => {
  const auth = token

  const octokitClient = new octokitWithPlugins({
    // log: console,
    auth,
    throttle: {
      onRateLimit: (retryAfter: number, options: any) => {
        octokitClient.log.warn(
          `Request quota exhausted for request ${options.method} ${options.url}`
        )

        if (options.request.retryCount === 0) {
          // only retries once
          octokitClient.log.info(`Retrying after ${retryAfter} seconds!`)
          return true
        }
      },
      onAbuseLimit: (retryAfter: number, options: any) => {
        // does not retry, only logs a warning
        octokitClient.log.warn(
          `Abuse detected for request ${options.method} ${options.url}`
        )
      },
    },
    retry: {
      doNotRetry: ['429'],
    },
  })

  return octokitClient
}

export { getClient }
