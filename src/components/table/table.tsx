import React, { useEffect } from "react"
import {
  useTable,
  useSortBy,
  useRowSelect,
  ColumnInstance,
  Row,
  useGroupBy,
  useExpanded,
  useColumnOrder,
} from "react-table"
import { StyledTable, StyledThead } from "./styled"

interface TableProps<T, RT = any> {
  selectedItemsClb?: (items: T[]) => T[] | void
  columns: RT
  data: T[]
  sortableBy?: string[]
  className?: string
  autoResetSelectedRows?: boolean
  autoResetSortBy?: boolean
  controlledState?: {
    columnOrder?: string[]
    groupBy?: string[] // For now we allow only single field grouping
    // any other controlled fields for react-table state
  }
}

export function Table<T extends object>({
  columns,
  data,
  sortableBy = [],
  selectedItemsClb,
  autoResetSelectedRows = false,
  autoResetSortBy = false,
  controlledState = {},
  ...customProps
}: TableProps<T>) {
  // preserve column order to override default grouping behaviour
  const columnOrder = controlledState.columnOrder || columns.map(({ id }) => id)
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    ...tableProps
  } = useTable(
    {
      columns,
      data,
      autoResetSelectedRows,
      autoResetSortBy,
      manualGroupBy: true,
      useControlledState: state => {
        return React.useMemo(
          () => ({
            ...state,
            ...controlledState,
            columnOrder,
          }),
          // eslint-disable-next-line
          [state, controlledState]
        )
      },
    },
    useGroupBy,
    useColumnOrder,
    useSortBy,
    useRowSelect,
    useExpanded
  )
  console.info(headerGroups)
  console.info(rows)

  useEffect(() => {
    if (selectedItemsClb) {
      selectedItemsClb(selectedFlatRows.map((r: Row<T>) => r.original))
    }
  }, [selectedFlatRows, selectedItemsClb])

  return (
    <StyledTable {...customProps} {...getTableProps()}>
      <StyledThead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: ColumnInstance<typeof columns>) => {
              const sortProps = sortableBy.includes(column.id) ? column.getSortByToggleProps() : {}
              return (
                <th {...sortProps} {...column.getHeaderProps()}>
                  {column.render("Header", { ...tableProps })}
                </th>
              )
            })}
          </tr>
        ))}
      </StyledThead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell", { ...tableProps })}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </StyledTable>
  )
}
