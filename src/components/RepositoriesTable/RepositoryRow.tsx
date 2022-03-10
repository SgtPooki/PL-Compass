import { Row } from 'react-table'

const RepositoryRow = ({ row }: { row: Row<EcosystemResearch.Repository> }) => {
  const props = row.values
  return (
    <tr className="stripe-dark">
      <td className="pa3">
        <a href={`https://github.com/${props.full_name}`}>{props.full_name}</a>
      </td>
      <td className="pa3">{props.description}</td>
      <td className="pa3">
        <a href={`https://github.com/${props.org}`}>{props.org}</a>
      </td>
      <td className="pa3">{props.score}</td>
      <td className="pa3">{props.stargazers_count}</td>
      <td className="pa3">{props.subscribers_count}</td>
      <td className="pa3">{props.contributors}</td>
    </tr>
  )
}

export { RepositoryRow }
