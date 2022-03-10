const LoadingRow = ({ colSpan }: { colSpan: number }) => {
  return (
    <tr className="stripe-dark">
      <td className="pa3" colSpan={colSpan}>
        Loading...
      </td>
    </tr>
  )
}

export { LoadingRow }
