import React from "react"
import { Checkbox } from "src/components/checkbox"

const ROW_SELECTION_MAX_SIZE = 45
const ROW_SELECTION_MIN_SIZE = 45
const ROW_SELECTION_SIZE = 45

const ColumnCheckbox = ({ checked, indeterminate, onChange, disabled, ...rest }) => {
  return (
    <Checkbox
      disabled={disabled}
      checked={checked}
      indeterminate={indeterminate}
      onChange={onChange}
      {...rest}
    />
  )
}

const makeRowSelection = ({ testPrefix }) => {
  return {
    id: "checkbox",
    enableHiding: false,
    enableResizing: false,
    header: ({ table }) => {
      return (
        <ColumnCheckbox
          data-testid={`netdata-table-header-checkbox${testPrefix}`}
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={table.getIsSomePageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
        />
      )
    },
    cell: ({ row }) => {
      const isDisabled = row.original?.disabled ?? false
      return (
        <ColumnCheckbox
          data-testid={`netdata-table-cell-checkbox${testPrefix}`}
          checked={row.getIsSelected()}
          indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
          disabled={isDisabled}
        />
      )
    },
    enableColumnFilter: false,
    enableSorting: false,
    size: ROW_SELECTION_SIZE,
    maxSize: ROW_SELECTION_MAX_SIZE,
    minSize: ROW_SELECTION_MIN_SIZE,
    meta: { stopPropagation: true },
  }
}

export default makeRowSelection
