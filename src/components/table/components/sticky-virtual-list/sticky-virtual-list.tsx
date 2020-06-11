import React, { forwardRef, ReactNode, MutableRefObject } from "react"
import { StickyListContextProvider, StickyListContextConsumer } from "../../layout-context"
import { TableContainer, TableBody } from "../table-container"
import { TableHead } from "../table-head"
import { StyledFixedList, StyledVariableList } from "./styled"

const ItemWrapper = ({ data, index, style }: any) => {
  const { ItemRenderer } = data
  return <ItemRenderer index={index} style={style} data={data} />
}

const innerElementType = forwardRef(
  // width shouldn't be taken from react-window prop source
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

interface Props {
  className?: string
  layoutType: string
  getTableProps: unknown
  getTableBodyProps: unknown
  headerGroups: unknown
  overscanCount?: number
  sortableBy: string[]
  variableSize: boolean
  children: ReactNode
  width: number
  height: number
  itemCount: number
  itemSize: number | GetItemSize
  resetAfterIndex?: (index: number, shouldForceUpdate: boolean) => void
  customProps: unknown
  callbackRef: any
  itemKey?: (index: number, data: any) => string
  orderedRows: []
  innerRef?: any
  outerRef?: any
  onItemsRendered?: (renderData: {
    overscanStartIndex: number
    overscanStopIndex: number
    visibleStartIndex: number
    visibleStopIndex: number
  }) => void
  onScroll?: (scrollData: {
    scrollDirection: "forward" | "backward"
    scrollOffset: number
    scrollUpdateWasRequested: boolean
  }) => void
}

export const StickyVirtualList = ({
  children,
  getTableProps,
  getTableBodyProps,
  headerGroups,
  sortableBy,
  className,
  customProps,
  layoutType,
  variableSize,
  callbackRef,
  itemKey,
  orderedRows,
  ...rest
}: Props) => (
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
    {variableSize ? (
      <StyledVariableList
        itemData={{ ItemRenderer: children, orderedRows }}
        ref={callbackRef}
        itemKey={itemKey}
        {...rest}
      >
        {ItemWrapper}
      </StyledVariableList>
    ) : (
      <StyledFixedList
        itemData={{ ItemRenderer: children, orderedRows }}
        ref={callbackRef}
        itemKey={itemKey}
        {...rest}
      >
        {ItemWrapper}
      </StyledFixedList>
    )}
  </StickyListContextProvider>
)

// TODO - decide if we want to expose innerElementType
// Right now we assume, that we only want to virtualize existing table component,
// not a multiple different components with different design specs
StickyVirtualList.defaultProps = {
  innerElementType,
}
