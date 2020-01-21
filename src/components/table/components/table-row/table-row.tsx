import React, { ReactNode, useContext } from "react"
import { LayoutContext } from "../../layout-context"
import { TableCell } from "../table-cell"

const rowRenderOptions = {
  block: ({ children, ...props }: any) => (
    <div className="table-row" {...props}>
      {children}
    </div>
  ),
  table: ({ children, ...props }: any) => <tr {...props}>{children}</tr>,
}

const RowTag = ({ children, layoutType, ...props }: any) => {
  const renderTag = rowRenderOptions[layoutType]
  return renderTag({ children, ...props })
}

interface Props {
  row: any
  prepareRow: (row: any) => void
  selectedRowIds: string[]
  renderGroupHead?: ({ row }: { row: any }) => ReactNode
}

export const TableRow = ({ row, prepareRow, selectedRowIds, renderGroupHead }: Props) => {
  const layoutType = useContext(LayoutContext)
  const { subRows } = row

  if (subRows.length > 0) {
    return renderGroupHead ? (
      <>{renderGroupHead({ row })}</>
    ) : (
      <>
        <tr {...row.getRowProps()}>
          <td colSpan={row.cells.length}>{row.groupByVal}</td>
        </tr>
        {subRows.map(subRow => {
          prepareRow(subRow)
          return (
            <TableRow
              key={subRow.id}
              row={subRow}
              prepareRow={prepareRow}
              selectedRowIds={selectedRowIds}
            />
          )
        })}
      </>
    )
  }
  return (
    <RowTag layoutType={layoutType} {...row.getRowProps()}>
      {row.cells.map(cell => {
        const { key, cellProps } = cell.getCellProps()
        return <TableCell key={key} cell={cell} selectedRowIds={selectedRowIds} {...cellProps} />
      })}
    </RowTag>
  )
}
