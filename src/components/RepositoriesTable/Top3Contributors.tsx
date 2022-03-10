import { useEffect, useState } from 'react'
// import { useAsync } from 'react-async'
import { getContributors } from '../../core/github/getContributors'
import { ErrorBoundary } from '../ErrorBoundary'

const Top3Contributors = ({ repoName }: { repoName: string }) => {
  // const { data, error } = useAsync({
  //   promiseFn: async () => await getContributors(repoName),
  // })
  const [contributors, setContributors] = useState([])
  useEffect(() => {
    const makeCall = async () => {
      setContributors(await getContributors(repoName))
    }
    makeCall()
  }, [])

  // if (error) return <span>{error.message}</span>
  if (contributors.length < 1 || contributors.slice == null)
    return <span>Loading...</span>
  return (
    <ErrorBoundary>
      <div>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {contributors.slice(0, 3).map((c: any, i: number) => (
          <div key={i}>
            <a href={c.html_url}>{c.login}</a>
          </div>
        ))}
      </div>
    </ErrorBoundary>
  )
}

export { Top3Contributors }
