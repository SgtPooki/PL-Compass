import { useAsync } from 'react-async'

import { fetchRepos } from './fetchRepos'
import { RepositoryRow } from './RepositoryRow'
const RepositoriesTable = () => {
  const { data, error } = useAsync<EcosystemResearch.Repository[]>({
    promiseFn: fetchRepos,
  })
  if (error) return <span>{error.message}</span>
  // if (data) console.log(data)

  return (
    <div className="pa4">
      <div className="overflow-auto">
        <table className="f6 w-100 mw8 center" cellSpacing="0">
          <thead>
            <tr className="stripe-dark">
              <th className="fw6 tl pa3 bg-white">Repo Name</th>
              <th className="fw6 tl pa3 bg-white">Description</th>
              <th className="fw6 tl pa3 bg-white">Organization</th>
              <th className="fw6 tl pa3 bg-white">Ecosystem score</th>
              <th className="fw6 tl pa3 bg-white">Stars</th>
              <th className="fw6 tl pa3 bg-white">Subscribers</th>
            </tr>
          </thead>
          <tbody className="lh-copy">
            {data == null ? (
              <tr className="stripe-dark">
                {' '}
                <td colSpan={6}>Loading...</td>
              </tr>
            ) : (
              data.map((r, i) => <RepositoryRow key={i} repo={r} />)
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export { RepositoriesTable }
