import { useEffect, useState } from 'react'
import { getContributors } from '../../core/github/getContributors'
import { ErrorBoundary } from '../ErrorBoundary'

const Top3Contributors = ({
  contributors,
}: {
  contributors: GitHub.RepoContributor[] | Promise<GitHub.RepoContributor[]>
}) => {
  const [stateContributors, setContributors] = useState(contributors)
  useEffect(() => {
    ;(async () => {
      setContributors(await contributors)
    })()
  })
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
          .slice(0, 3)
          .map((c: any, i: number) => (
            <div key={i}>
              <a href={c.html_url}>{c.login}</a>
            </div>
          ))}
      </div>
    </ErrorBoundary>
  )
}

export { Top3Contributors }
