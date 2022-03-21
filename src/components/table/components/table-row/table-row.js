import React, { useContext, useMemo } from "react"
import { LayoutContext } from "../../layout-context"
import { getGroupedCells } from "../../utils"
import { TableCell } from "../table-cell"
import { TableInnerRow } from "../table-inner-row"
import { StyledBlockRow, StyledRow } from "./styled"

const rowRenderOptions = {
  row: {
    block: ({ children, ...props }) => (
      <StyledBlockRow className="table-row" {...props}>
        {children}
      </StyledBlockRow>
    ),
    table: ({ children, ...props }) => <StyledRow {...props}>{children}</StyledRow>,
  },
  group: {},
}

const RowLayout = ({ children, layoutType, ...props }) => {
  const renderRow = rowRenderOptions.row[layoutType]
  return renderRow({ children, ...props })
}

const DefaultGroupHead = ({ row, layoutType, style }) => {
  const rowProps = row.getRowProps()
  return layoutType === "table" ? (
    <tr title="group-head" {...rowProps} style={style}>
      <td colSpan={row.cells.length}>{row.groupByVal}</td>
    </tr>
  ) : (
    <div className="group-head" {...rowProps} style={style}>
      {row.groupByVal}
    </div>
  )
}

export const TableRow = ({
  row,
  prepareRow,
  selectedRowIds,
  renderGroupHead,
  customProps,
  style,
}) => {
  const layoutType = useContext(LayoutContext)
  const { subRows, isVirtualGroupHeader } = row
  const groupedRows = useMemo(() => getGroupedCells(row.cells), [row.cells])

  const renderCells = cells => cells.map(cell => {
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
  })

  const renderInnerRows = innerRows =>
    Object.values(innerRows).map(innerRow => (
      <TableInnerRow
        row={innerRow.parentRow}
        customProps={customProps}
        key={innerRow.parentRow}
        selectedRowIds={selectedRowIds}
      >
        {renderCells(innerRow.children)}
      </TableInnerRow>
    ))

  if (isVirtualGroupHeader || subRows.length > 0) {
    return renderGroupHead ? (
      <>{renderGroupHead({ row, layoutType, prepareRow, selectedRowIds, customProps, style })}</>
    ) : (
      <DefaultGroupHead row={row} layoutType={layoutType} style={style} />
    )
  }
  const { hasStickyHeader } = customProps
  return (
    <RowLayout
      layoutType={layoutType}
      hasStickyHeader={hasStickyHeader}
      {...row.getRowProps({ style })}
    >
      {Object.keys(groupedRows).length
        ? renderInnerRows(groupedRows)
        : renderCells(row.cells)}
    </RowLayout>
  )
}
