import React, { useMemo } from "react"
import { Checkbox } from "@/components/checkbox"
import RadioButton from "@/components/radio-button"
import Flex from "@/components/templates/flex"

const width = 32

const Header = ({ table, testPrefix }) => (
  <Flex width={4}>
    <Checkbox
      data-testid={`netdata-table-header-checkbox${testPrefix}`}
      checked={table.getIsAllRowsSelected()}
      indeterminate={table.getIsSomeRowsSelected()}
      onChange={checked => {
        table.getToggleAllRowsSelectedHandler()({ target: { checked } })
      }}
    />
  </Flex>
)

const Cell = ({ row, singleRowSelection, testPrefix }) => {
  if (row.original?.disabled === "hidden") return null

  if (singleRowSelection)
    return (
      <RadioButton
        data-testid={`netdata-table-cell-radio-button${testPrefix}`}
        checked={!row.original?.disabled && row.getIsSelected()}
        name="netdata-table-row-radio-button-selection"
        onChange={e => {
          e?.stopPropagation?.()
          row.getToggleSelectedHandler()({ target: { checked: e.target.checked } })
        }}
        disabled={row.original?.disabled || false}
      />
    )

  return (
    <Checkbox
      data-testid={`netdata-table-cell-checkbox${testPrefix}`}
      checked={!row.original?.disabled && row.getIsSelected()}
      indeterminate={row.getIsSomeSelected()}
      onChange={(checked, e) => {
        e?.stopPropagation?.()
        row.getToggleSelectedHandler()({ target: { checked } })
      }}
      disabled={row.original?.disabled || false}
    />
  )
}

export default (enabled, { testPrefix, tableMeta, singleRowSelection }) =>
  useMemo(
    () =>
      enabled
        ? {
            id: "checkbox",
            enableHiding: false,
            enableResizing: false,
            header: ({ table }) =>
              !singleRowSelection ? <Header table={table} testPrefix={testPrefix} /> : null,
            cell: ({ row }) => (
              <Cell row={row} singleRowSelection={singleRowSelection} testPrefix={testPrefix} />
            ),
            enableColumnFilter: false,
            enableSorting: false,
            size: width,
            maxSize: width,
            minSize: width,
            notFlex: true,
            tableMeta,
          }
        : null,
    [enabled, testPrefix, tableMeta, singleRowSelection]
  )
