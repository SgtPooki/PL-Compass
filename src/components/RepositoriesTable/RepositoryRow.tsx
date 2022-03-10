import { Row } from 'react-table'
import { Top3Contributors } from './Top3Contributors'
const RepositoryRow = ({ repo }: { repo: EcosystemResearch.Repository }) => {
  const props = repo

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
      <td className="pa3">
        <a href={`https://github.com/${props.full_name}/contributors`}>
          {props.full_name}/contributors
        </a>
      </td>
      <td className="pa3">
        <Top3Contributors contributors={props.contributors} />
      </td>
    </tr>
  )
}

export { RepositoryRow }
