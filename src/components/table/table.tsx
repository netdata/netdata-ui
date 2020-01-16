import React, { useEffect, ReactNode } from "react"
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
import { ColumnHead } from "./components/column-head"
import { TableRow } from "./components/table-row"

interface TableProps<T, RT = any> {
  selectedItemsClb?: (items: T[]) => T[] | void
  columns: RT
  data: T[]
  sortableBy?: string[]
  className?: string
  autoResetSelectedRows?: boolean
  autoResetSortBy?: boolean
  autoResetGroupBy?: boolean
  controlledState?: {
    columnOrder?: string[]
    groupBy?: string[] // For now we allow only single field grouping
    // any other controlled fields for react-table state
  }
  renderGroupHead?: ({ row }: { row: any }) => ReactNode
}

export function Table<T extends object>({
  columns,
  data,
  sortableBy = [],
  selectedItemsClb,
  autoResetSelectedRows = false,
  autoResetSortBy = false,
  autoResetGroupBy = false,
  controlledState = {},
  renderGroupHead,
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
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      autoResetSelectedRows,
      autoResetSortBy,
      autoResetGroupBy,
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
              const { key } = column.getHeaderProps()
              return (
                <ColumnHead
                  key={key}
                  column={column}
                  customProps={customProps}
                  sortableBy={sortableBy}
                />
              )
            })}
          </tr>
        ))}
      </StyledThead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)

          return (
            <TableRow
              key={row.id}
              row={row}
              customProps={customProps}
              prepareRow={prepareRow}
              selectedRowIds={selectedRowIds}
              renderGroupHead={renderGroupHead}
            />
          )
        })}
      </tbody>
    </StyledTable>
  )
}
