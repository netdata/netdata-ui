import React, { ReactNode, useContext } from "react"
import { LayoutContext } from "../../layout-context"
import { TableCell } from "../table-cell"
import { StyledRow, StyledBlockRow } from "./styled"

const rowRenderOptions = {
  row: {
    block: ({ children, ...props }: any) => (
      <StyledBlockRow className="table-row" {...props}>
        {children}
      </StyledBlockRow>
    ),
    table: ({ children, ...props }: any) => <StyledRow {...props}>{children}</StyledRow>,
  },
  group: {},
}

const RowLayout = ({ children, layoutType, ...props }: any) => {
  const renderRow = rowRenderOptions.row[layoutType]
  return renderRow({ children, ...props })
}

const DefaultGroupHead = ({ row, layoutType, style }: any) => {
  const rowProps = row.getRowProps()
  return layoutType === "table" ? (
    <tr {...rowProps} style={style}>
      <td colSpan={row.cells.length}>{row.groupByVal}</td>
    </tr>
  ) : (
    <div className="group-head" {...rowProps} style={style}>
      {row.groupByVal}
    </div>
  )
}

interface Props {
  row: any
  prepareRow: (row: any) => void
  selectedRowIds: string[]
  renderGroupHead?: (props: {
    row: any
    layoutType: "block" | "table"
    prepareRow: Function
    selectedRowIds: any
    customProps?: Object
    style?: Object
  }) => ReactNode
  customProps?: Object
  style?: Object | any
}

export const TableRow = ({
  row,
  prepareRow,
  selectedRowIds,
  renderGroupHead,
  customProps,
  style,
}: Props) => {
  const layoutType = useContext(LayoutContext) as "block" | "table"
  const { subRows, isVirtualGroupHeader } = row

  if (isVirtualGroupHeader || subRows.length > 0) {
    return renderGroupHead ? (
      <>{renderGroupHead({ row, layoutType, prepareRow, selectedRowIds, customProps, style })}</>
    ) : (
      <DefaultGroupHead row={row} layoutType={layoutType} style={style} />
    )
  }

  return (
    <RowLayout layoutType={layoutType} {...row.getRowProps({ style })}>
      {row.cells.map(cell => {
        const { key, ...cellProps } = cell.getCellProps()
        return (
          <TableCell
            key={key}
            cell={cell}
            selectedRowIds={selectedRowIds}
            {...cellProps}
            customProps={customProps}
          />
        )
      })}
    </RowLayout>
  )
}
