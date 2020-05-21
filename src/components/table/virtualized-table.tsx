import React, { useEffect, useMemo, useCallback, forwardRef } from "react"
import { useTable, Row } from "react-table"
import { FixedSizeList } from "react-window"
import { StyledTable, BlockLayout } from "./styled"
import { TableRow } from "./components/table-row"
import { TableHead } from "./components/table-head"
import {
  LayoutContextProvider,
  StickyListContextProvider,
  StickyListContextConsumer,
} from "./layout-context"
import { defaultGroupByFn, sortGroupsByPriority, unwrapGroupedRows } from "./utils"
import { TableProps } from "./table"
import { tableHooks, blockTableHooks } from "./table-hooks"

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

const ItemWrapper = ({ data, index, style }: any) => {
  const { ItemRenderer } = data
  /* if (index === 0) {
    return <ItemRenderer index={index} style={{ top: style.top * 2, ...style }} />
  } */
  return <ItemRenderer index={index} style={style} />
}

const innerElementType = forwardRef(
  ({ children, style: { width, ...restStyles }, ...rest }: any, ref) => (
    <StickyListContextConsumer>
      {({
        getTableProps,
        getTableBodyProps,
        headerGroups,
        sortableBy,
        className,
        customProps,
        layoutType,
      }: any) => (
        <TableContainer
          style={restStyles}
          layoutType={layoutType}
          {...getTableProps()}
          className={className}
          callbackRef={ref}
        >
          <TableHead
            headerGroups={headerGroups}
            sortableBy={sortableBy}
            customProps={customProps}
          />
          <TableBody layoutType={layoutType} {...getTableBodyProps()}>
            {children}
          </TableBody>
        </TableContainer>
      )}
    </StickyListContextConsumer>
  )
)

const StickyList = ({
  children,
  getTableProps,
  getTableBodyProps,
  headerGroups,
  sortableBy,
  className,
  customProps,
  layoutType,
  ...rest
}: any) => (
  <StickyListContextProvider
    value={{
      ItemRenderer: children,
      getTableProps,
      getTableBodyProps,
      headerGroups,
      sortableBy,
      className,
      customProps,
      layoutType,
    }}
  >
    <FixedSizeList itemData={{ ItemRenderer: children }} {...rest}>
      {ItemWrapper}
    </FixedSizeList>
  </StickyListContextProvider>
)

interface VTableProps<T> extends TableProps<T> {
  width: number
  height: number
}

export function VirtualizedTable<T extends object>({
  groupsOrderSettings,
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
  width,
  height,
  callbackRef,
  groupByFn = defaultGroupByFn,
  ...customProps
}: VTableProps<T>) {
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
    state: { selectedRowIds, groupBy },
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

  const orderedRows = useMemo(() => {
    if (groupBy.length > 0 && groupsOrderSettings && groupsOrderSettings.groupsOrder[groupBy[0]]) {
      const result = unwrapGroupedRows(sortGroupsByPriority(rows, groupsOrderSettings))
      return result
    }
    return rows
  }, [groupBy, groupsOrderSettings, rows])

  const renderVirtualizedRow = useCallback(
    ({ index, style }) => {
      const row = orderedRows[index]
      prepareRow(row)
      return (
        <TableRow
          key={row.id}
          style={style}
          customProps={customProps}
          row={row}
          prepareRow={prepareRow}
          selectedRowIds={selectedRowIds}
          renderGroupHead={renderGroupHead}
        />
      )
    },
    [orderedRows, prepareRow, customProps, selectedRowIds, renderGroupHead]
  )

  return (
    <LayoutContextProvider value={layoutType}>
      <StickyList
        height={height}
        itemCount={orderedRows.length}
        itemSize={40}
        width={width}
        innerElementType={innerElementType}
        getTableProps={getTableProps}
        getTableBodyProps={getTableBodyProps}
        headerGroups={headerGroups}
        sortableBy={sortableBy}
        className={className}
        customProps={customProps}
        layoutType={layoutType}
      >
        {renderVirtualizedRow}
      </StickyList>
    </LayoutContextProvider>
  )
}
