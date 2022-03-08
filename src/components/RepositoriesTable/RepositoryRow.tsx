const RepositoryRow = ({ repo }: { repo: EcosystemResearch.Repository }) => {
  return (
    <tr className="stripe-dark">
      <td className="pa3">
        <a href={`https://github.com/${repo.full_name}`}>{repo.full_name}</a>
      </td>
      <td className="pa3">{repo.description}</td>
      <td className="pa3">
        <a href={`https://github.com/${repo.org}`}>{repo.org}</a>
      </td>
      <td className="pa3">{repo.score}</td>
      <td className="pa3">{repo.stargazers_count}</td>
      <td className="pa3">{repo.subscribers_count}</td>
    </tr>
  )
}

export { RepositoryRow }
