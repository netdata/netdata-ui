import React, { ReactNode, useContext } from "react"
import { LayoutContext } from "../../layout-context"
import { TableCell } from "../table-cell"

const rowRenderOptions = {
  row: {
    block: ({ children, ...props }: any) => (
      <div className="table-row" {...props}>
        {children}
      </div>
    ),
    table: ({ children, ...props }: any) => <tr {...props}>{children}</tr>,
  },
  group: {},
}

const RowLayout = ({ children, layoutType, ...props }: any) => {
  const renderRow = rowRenderOptions.row[layoutType]
  return renderRow({ children, ...props })
}

const DefaultGroupHead = ({ row, layoutType }: any) => {
  const rowProps = row.getRowProps()
  return layoutType === "table" ? (
    <tr {...rowProps}>
      <td colSpan={row.cells.length}>{row.groupByVal}</td>
    </tr>
  ) : (
    <div className="group-head" {...rowProps}>
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
  }) => ReactNode
  customProps?: Object
}

export const TableRow = ({
  row,
  prepareRow,
  selectedRowIds,
  renderGroupHead,
  customProps,
}: Props) => {
  const layoutType = useContext(LayoutContext) as "block" | "table"
  const { subRows } = row

  if (subRows.length > 0) {
    return renderGroupHead ? (
      <>{renderGroupHead({ row, layoutType, prepareRow, selectedRowIds, customProps })}</>
    ) : (
      <>
        <DefaultGroupHead row={row} layoutType={layoutType} />
        {subRows.map(subRow => {
          prepareRow(subRow)
          return (
            <TableRow
              key={subRow.id}
              row={subRow}
              prepareRow={prepareRow}
              customProps={customProps}
              selectedRowIds={selectedRowIds}
            />
          )
        })}
      </>
    )
  }
  return (
    <RowLayout layoutType={layoutType} {...row.getRowProps()}>
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
