import React, { ReactNode } from "react"

interface Props {
  row: any
  customProps: Object
  prepareRow: (row: any) => void
  selectedRowIds: string[]
  renderGroupHead?: ({ row }: { row: any }) => ReactNode
}

export const TableRow = ({
  row,
  customProps,
  prepareRow,
  selectedRowIds,
  renderGroupHead,
}: Props) => {
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
              customProps={customProps}
              prepareRow={prepareRow}
              selectedRowIds={selectedRowIds}
            />
          )
        })}
      </>
    )
  }
  return (
    <tr {...row.getRowProps()}>
      {row.cells.map(cell => {
        return (
          <td {...cell.getCellProps()}>
            {cell.render("Cell", { ...customProps, selectedRowIds })}
          </td>
        )
      })}
    </tr>
  )
}
