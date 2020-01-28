import React, { useEffect, useMemo, ReactNode } from "react"
import {
  useTable,
  useSortBy,
  useRowSelect,
  Row,
  useGroupBy,
  useExpanded,
  useColumnOrder,
  useBlockLayout,
} from "react-table"
import { StyledTable, BlockLayout } from "./styled"
import { TableRow } from "./components/table-row"
import { TableHead } from "./components/table-head"
import { LayoutContextProvider } from "./layout-context"
import { defaultGroupByFn } from "./utils"

const tableHooks = [useGroupBy, useColumnOrder, useSortBy, useRowSelect, useExpanded]
const blockTableHooks = [...tableHooks, useBlockLayout]

const tableRenderOptions = {
  mainContainer: {
    block: ({ children, className, callbackRef, ...props }: any) => (
      <BlockLayout ref={callbackRef} className={`table-container ${className || ""}`} {...props}>
        {children}
      </BlockLayout>
    ),
    table: ({ children, callbackRef, ...props }: any) => (
      <StyledTable ref={callbackRef} {...props}>
        {children}
      </StyledTable>
    ),
  },
  tbody: {
    block: ({ children, ...props }: any) => (
      <div className="table-body" {...props}>
        {children}
      </div>
    ),
    table: ({ children, ...props }: any) => <tbody {...props}>{children}</tbody>,
  },
}

const TableContainer = ({ children, layoutType, ...props }: any) => {
  const renderTableContainer = tableRenderOptions.mainContainer[layoutType]
  return renderTableContainer({ children, ...props })
}

const TableBody = ({ children, layoutType, ...props }: any) => {
  const renderTableBody = tableRenderOptions.tbody[layoutType]
  return renderTableBody({ children, ...props })
}

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
  renderGroupHead?: (props: {
    row: any
    layoutType: "block" | "table"
    prepareRow: Function
    selectedRowIds: any
    customProps?: Object
  }) => ReactNode
  callbackRef?: (node: any) => void
  groupByFn?: Function
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
  callbackRef,
  groupByFn = defaultGroupByFn,
  ...customProps
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
      groupByFn,
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
      <TableContainer
        layoutType={layoutType}
        {...getTableProps()}
        className={className}
        callbackRef={callbackRef}
      >
        <TableHead headerGroups={headerGroups} sortableBy={sortableBy} customProps={customProps} />
        <TableBody layoutType={layoutType} {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)

            return (
              <TableRow
                key={row.id}
                customProps={customProps}
                row={row}
                prepareRow={prepareRow}
                selectedRowIds={selectedRowIds}
                renderGroupHead={renderGroupHead}
              />
            )
          })}
        </TableBody>
      </TableContainer>
    </LayoutContextProvider>
  )
}
