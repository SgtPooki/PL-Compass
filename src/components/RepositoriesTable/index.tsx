/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMemo, useState } from 'react'
import { useAsync } from 'react-async'
import {
  Column,
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  usePagination,
  Row,
  FilterTypes,
} from 'react-table'

import { fetchRepos } from './fetchRepos'
import { RepositoryRow } from './RepositoryRow'
import { ErrorBoundary } from '../ErrorBoundary'
import { LoadingRow } from './LoadingRow'
import { matchSorter } from 'match-sorter'
import { union } from 'lodash'

const RepositoriesTable = () => {
  const columns: Column<EcosystemResearch.Repository>[] = useMemo(
    () => [
      {
        Header: 'Repo Name',
        accessor: 'full_name',
        filter: 'text',
      },
      {
        Header: 'Description',
        accessor: 'description',
        filter: 'fuzzyText',
      },
      {
        Header: 'Organization',
        accessor: 'org',
        Filter: SelectColumnFilter,
        filter: 'equals',
      },
      {
        Header: 'Ecosystem Score',
        accessor: 'score',
        defaultCanSort: true,
        sortDescFirst: true,
        isSorted: true,
        isSortedDesc: true,
        disableFilters: true,
      },
      {
        Header: 'Stars',
        accessor: 'stargazers_count',
        disableFilters: true,
      },
      {
        Header: 'Subscribers',
        accessor: 'subscribers_count',
        disableFilters: true,
      },
      {
        Header: 'Contributors (github link)',
      },
      {
        Header: 'Top 3 contributors',
        accessor: 'contributors',
        filter: 'contributors',
        Cell: () => {
          return <div>test</div>
        },
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
function fuzzyTextFilterFn(
  rows: Row<EcosystemResearch.Repository>[],
  ids: string[],
  filterValue: string
) {
  return matchSorter(rows, filterValue, {
    keys: [
      (row: Row<EcosystemResearch.Repository>) =>
        ids.map((id) => row.values[id]),
    ],
  })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val?: string) => !val

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: any) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = useState(globalFilter)
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span>
      Global Search:{' '}
      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  )
}

const Table = ({
  columns,
  data,
}: {
  columns: readonly Column<EcosystemResearch.Repository>[]
  data: readonly EcosystemResearch.Repository[]
}) => {
  const filterTypes: FilterTypes<EcosystemResearch.Repository> = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (
        rows: Row<EcosystemResearch.Repository>[],
        ids: string[],
        filterValue: string
      ) => {
        return rows.filter((row: Row<EcosystemResearch.Repository>) => {
          return (
            ids.find((id: string) => {
              const rowValue = row.values[id]
              return rowValue !== undefined
                ? String(rowValue)
                    .toLowerCase()
                    .includes(String(filterValue).toLowerCase())
                : false
            }) !== undefined
          )
        })
      },
      contributors: (
        rows: Row<EcosystemResearch.Repository>[],
        id: string[],
        filterValue: string
      ) => {
        if (id.length > 1) {
          console.error(
            'Received multiple IDs in `contributors` filter, but only single id support is implemented'
          )
        }
        if (id[0] !== 'contributors') {
          throw new Error(
            'Attempted to filter non-contributors column with contributor filter!'
          )
        }

        const matchingRows: Row<EcosystemResearch.Repository>[] = []
        for (const row of rows) {
          const contributors = row.values
            .contributors as GitHub.RepoContributor[]
          const isValidContributors =
            contributors !== undefined && contributors.length !== undefined

          if (!isValidContributors) {
            continue
          }
          const top3Contributors = contributors
            .slice(0, 3)
            .map((contributor) => contributor.login.toLowerCase())

          if (
            top3Contributors.find((contributor) =>
              contributor.includes(filterValue.toLowerCase())
            )
          ) {
            matchingRows.push(row)
          }
        }
        return matchingRows
      },
    }),
    []
  )

  const globalFilter = useMemo(
    () =>
      (
        rows: Row<EcosystemResearch.Repository>[],
        ids: string[],
        filterValue: string
      ) => {
        return union([
          ...filterTypes.text(rows, ids, filterValue),
          ...filterTypes.contributors(rows, ['contributors'], filterValue),
        ])
      },

    [filterTypes]
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
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      globalFilter,
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    usePagination
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
              <tr>
                <th
                  colSpan={visibleColumns.length}
                  style={{
                    textAlign: 'left',
                  }}
                >
                  <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                  />
                </th>
              </tr>
              {headerGroups.map((headerGroup) => (
                <tr
                  className="stripe-dark"
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column) => {
                    return (
                      <th
                        className="fw6 tl pa3 bg-white"
                        {...column.getHeaderProps()}
                      >
                        {column.render('Header')}
                        <br />
                        <span {...column.getSortByToggleProps()}>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? 'Sort: 🔽'
                              : 'Sort: 🔼'
                            : 'Sort: N/A'}
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
                page.map((row) => {
                  prepareRow(row)
                  return (
                    <RepositoryRow
                      repo={row.values as EcosystemResearch.Repository}
                      {...row.getRowProps()}
                    />
                  )
                })
              )}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </button>{' '}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {'<'}
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {'>'}
            </button>{' '}
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {'>>'}
            </button>{' '}
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            <span>
              | Go to page:{' '}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  gotoPage(page)
                }}
                style={{ width: '100px' }}
              />
            </span>{' '}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export { RepositoriesTable }
