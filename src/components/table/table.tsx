import React, { useEffect, useMemo, ReactNode } from "react"
import {
  useTable,
  useSortBy,
  useRowSelect,
  ColumnInstance,
  Row,
  useGroupBy,
  useExpanded,
  useColumnOrder,
  useBlockLayout,
} from "react-table"
import { StyledTable, StyledThead } from "./styled"
import { ColumnHead } from "./components/column-head"
import { TableRow } from "./components/table-row"
import { LayoutContextProvider } from "./layout-context"

const tableHooks = [useGroupBy, useColumnOrder, useSortBy, useRowSelect, useExpanded]
const blockTableHooks = [...tableHooks, useBlockLayout]

interface TableProps<T, RT = any> {
  layoutType?: "table" | "block"
  selectedItemsClb?: (items: T[]) => T[] | void
  columns: RT
  data: T[]
  sortableBy?: string[]
  className?: string
  autoResetSelectedRows?: boolean
  autoResetSortBy?: boolean
  autoResetGroupBy?: boolean
  // initializer for table instance state, according to react-table signature
  initialState?: {
    sortBy?: [{ id: string; desc: Boolean }]
  }
  controlledState?: {
    columnOrder?: string[]
    groupBy?: string[] // For now we allow only single field grouping
    // any other controlled fields for react-table state
  }
  renderGroupHead?: ({ row }: { row: any }) => ReactNode
}

export function Table<T extends object>({
  layoutType = "table",
  columns,
  data,
  sortableBy = [],
  selectedItemsClb,
  autoResetSelectedRows = false,
  autoResetSortBy = false,
  autoResetGroupBy = false,
  controlledState = {},
  renderGroupHead,
  initialState = {},
  className,
}: TableProps<T>) {
  // preserve column order to override default grouping behaviour
  const columnOrder = useMemo(() => controlledState.columnOrder || columns.map(({ id }) => id), [
    columns,
    controlledState.columnOrder,
  ])

  const reactTableHooks = layoutType === "block" ? blockTableHooks : tableHooks

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
      initialState,
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
    ...reactTableHooks
  )

  useEffect(() => {
    if (selectedItemsClb) {
      selectedItemsClb(selectedFlatRows.map((r: Row<T>) => r.original))
    }
  }, [selectedFlatRows, selectedItemsClb])

  return (
    <LayoutContextProvider value={layoutType}>
      <StyledTable {...getTableProps()} className={className}>
        <StyledThead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: ColumnInstance<typeof columns>) => {
                const { key } = column.getHeaderProps()
                return <ColumnHead key={key} column={column} sortableBy={sortableBy} />
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
                prepareRow={prepareRow}
                selectedRowIds={selectedRowIds}
                renderGroupHead={renderGroupHead}
              />
            )
          })}
        </tbody>
      </StyledTable>
    </LayoutContextProvider>
  )
}
