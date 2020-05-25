import React, { forwardRef, ReactNode } from "react"
import { FixedSizeList, VariableSizeList } from "react-window"
import { StickyListContextProvider, StickyListContextConsumer } from "../../layout-context"
import { TableContainer, TableBody } from "../table-container"
import { TableHead } from "../table-head"

const ItemWrapper = ({ data, index, style }: any) => {
  const { ItemRenderer } = data
  return <ItemRenderer index={index} style={style} />
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
      <VariableSizeList itemData={{ ItemRenderer: children }} {...rest}>
        {ItemWrapper}
      </VariableSizeList>
    ) : (
      <FixedSizeList itemData={{ ItemRenderer: children }} {...rest}>
        {ItemWrapper}
      </FixedSizeList>
    )}
  </StickyListContextProvider>
)

// TODO - decide if we want to expose innerElementType
// Right now we assume, that we only want to virtualize existing table component,
// not a multiple different components with different design specs
StickyVirtualList.defaultProps = {
  innerElementType,
}
