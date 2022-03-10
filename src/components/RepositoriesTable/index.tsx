/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMemo } from 'react'
import { useAsync } from 'react-async'
import {
  Column,
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
} from 'react-table'

import { fetchRepos } from './fetchRepos'
import { RepositoryRow } from './RepositoryRow'
import { ErrorBoundary } from '../ErrorBoundary'
import { LoadingRow } from './LoadingRow'
import { matchSorter } from 'match-sorter'

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
        Filter: SelectColumnFilter,
        filter: 'includes',
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
      {
        Header: 'Contributors (github link)',
      },
      {
        Header: 'Top 3 contributors',
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
// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}
// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}: any) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach((row: any) => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option: any, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}
function fuzzyTextFilterFn(rows: any, id: any, filterValue: any) {
  return matchSorter(rows, filterValue, {
    keys: [(row: any) => row.values[id]],
  })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val: any) => !val
const Table = ({
  columns,
  data,
}: {
  columns: readonly Column<EcosystemResearch.Repository>[]
  data: readonly EcosystemResearch.Repository[]
}) => {
  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows: any, id: any, filterValue: any) => {
        return rows.filter((row: any) => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )
  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
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
                        {/* Render the columns filter UI */}
                        <div>
                          {column.canFilter ? column.render('Filter') : null}
                        </div>
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
