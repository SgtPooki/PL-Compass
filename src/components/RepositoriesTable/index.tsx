/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMemo } from 'react'
import { useAsync } from 'react-async'
import { Column, useTable, useSortBy } from 'react-table'

import { fetchRepos } from './fetchRepos'
import { RepositoryRow } from './RepositoryRow'
import { ErrorBoundary } from '../ErrorBoundary'
import { LoadingRow } from './LoadingRow'

const RepositoriesTable = () => {
  const columns: Column<EcosystemResearch.Repository>[] = useMemo(
    () => [
      {
        Header: 'Repo Name',
        accessor: 'full_name',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Organization',
        accessor: 'org',
      },
      {
        Header: 'Ecosystem Score',
        accessor: 'score',
        defaultCanSort: true,
        sortDescFirst: true,
        isSorted: true,
        isSortedDesc: true,
      },
      {
        Header: 'Stars',
        accessor: 'stargazers_count',
      },
      {
        Header: 'Subscribers',
        accessor: 'subscribers_count',
      },
    ],
    []
  )
  const { data: rowData, error } = useAsync<EcosystemResearch.Repository[]>({
    promiseFn: fetchRepos,
  })

  const data = rowData ?? ([] as EcosystemResearch.Repository[])

  if (error) return <span>{error.message}</span>

  return <Table columns={columns} data={data} />
}

const Table = ({
  columns,
  data,
}: {
  columns: readonly Column<EcosystemResearch.Repository>[]
  data: readonly EcosystemResearch.Repository[]
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    )

  return (
    <ErrorBoundary>
      <div className="pa4">
        <div className="overflow-auto">
          <table
            className="f6 w-100 mw8 center"
            cellSpacing="0"
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  className="stripe-dark"
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column) => {
                    return (
                      <th
                        className="fw6 tl pa3 bg-white"
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render('Header')}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? ' 🔽'
                              : ' 🔼'
                            : ''}
                        </span>
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="lh-copy" {...getTableBodyProps()}>
              {data.length < 1 ? (
                <LoadingRow colSpan={columns.length} />
              ) : (
                rows.map((row) => {
                  prepareRow(row)
                  return <RepositoryRow row={row} {...row.getRowProps()} />
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export { RepositoriesTable }
