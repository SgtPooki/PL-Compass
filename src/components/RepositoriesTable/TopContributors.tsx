import { useEffect, useState } from 'react'
import { MAX_CONTRIBUTORS } from '../../core/constants'
import { useGithubToken } from '../../core/hooks/useGithubToken'
import { ErrorBoundary } from '../ErrorBoundary'

const TopContributors = ({ repo }: { repo: EcosystemResearch.Repository }) => {
  const [stateContributors, setContributors] = useState(repo.contributors)
  const { token } = useGithubToken()

  useEffect(() => {
    const updateContributors = async () => {
      const finalContributors = await repo.contributors
      repo.contributors = finalContributors
      setContributors(finalContributors)
    }
    updateContributors()
  }, [token, repo])

  if (stateContributors == null) {
    return <span>Error calling github API</span>
  }
  const maybeContributors = stateContributors as GitHub.RepoContributor[]
  const isArray = maybeContributors.length && maybeContributors.slice

  const isLoading =
    !isArray || maybeContributors.length < 1 || maybeContributors.slice == null

  if (isLoading) {
    return <span>Loading...</span>
  }

  return (
    <ErrorBoundary>
      <div>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {(stateContributors as GitHub.RepoContributor[])
          .slice(0, MAX_CONTRIBUTORS)
          .map((c: any, i: number) => (
            <div key={i}>
              <a href={c.html_url}>{c.login}</a>
            </div>
          ))}
      </div>
    </ErrorBoundary>
  )
}

export { TopContributors }
