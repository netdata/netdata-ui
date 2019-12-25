import React, { useEffect } from "react"
import { useTable, useSortBy, useRowSelect, ColumnInstance, Row } from "react-table"
import { StyledTable, StyledThead } from "./styled"

interface TableProps<T, RT = any> {
  selectedItemsClb?: (items: T[]) => T[] | void
  columns: RT
  data: T[]
  sortedBy?: string[]
  className?: string
  autoResetSelectedRows?: boolean
  autoResetSortBy?: boolean
}

function ReactTable<T extends object>({
  columns,
  data,
  sortedBy = [],
  selectedItemsClb,
  autoResetSelectedRows = true,
  autoResetSortBy = true,
  ...props
}: TableProps<T>) {
  // @ts-ignore
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    ...rest
  } = useTable(
    // @ts-ignore
    { columns, data, autoResetSelectedRows, autoResetSortBy },
    useSortBy,
    useRowSelect
  )
  useEffect(() => {
    if (selectedItemsClb) {
      selectedItemsClb(selectedFlatRows.map((r: Row<T>) => r.original))
    }
  }, [selectedFlatRows, selectedItemsClb])

  return (
    <StyledTable {...props} {...getTableProps()}>
      <StyledThead>
        {headerGroups.map((headerGroup, i) => (
          <tr key={i}>
            {headerGroup.headers.map((column: ColumnInstance<typeof columns>) => (
              <th
                {...column.getHeaderProps(
                  // @ts-ignore
                  sortedBy.includes(column.id) && column.getSortByToggleProps()
                )}
              >
                {column.render("Header", { ...rest })}
              </th>
            ))}
          </tr>
        ))}
      </StyledThead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell", { ...rest })}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </StyledTable>
  )
}

export function Table<T extends object>({
  selectedItemsClb,
  data,
  sortedBy,
  columns,
  ...props
}: TableProps<T>) {
  const cachedColumns = React.useMemo<typeof columns>(() => columns, [columns])

  return (
    <ReactTable<T>
      selectedItemsClb={selectedItemsClb}
      columns={cachedColumns}
      sortedBy={sortedBy}
      data={data}
      {...props}
    />
  )
}
