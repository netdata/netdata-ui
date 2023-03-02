import React, { useMemo } from "react"
import { Checkbox } from "src/components/checkbox"

const width = 45

export default (enabled, { testPrefix, tableMeta }) =>
  useMemo(
    () =>
      enabled
        ? {
            id: "checkbox",
            enableHiding: false,
            enableResizing: false,
            header: ({ table }) => (
              <Checkbox
                data-testid={`netdata-table-header-checkbox${testPrefix}`}
                checked={table.getIsAllRowsSelected()}
                indeterminate={table.getIsSomeRowsSelected()}
                onChange={table.getToggleAllRowsSelectedHandler()}
              />
            ),
            cell: ({ row }) =>
              row.original?.disabled !== "hidden" && (
                <Checkbox
                  data-testid={`netdata-table-cell-checkbox${testPrefix}`}
                  checked={!row.original?.disabled && row.getIsSelected()}
                  indeterminate={row.getIsSomeSelected()}
                  onChange={row.getToggleSelectedHandler()}
                  disabled={row.original?.disabled || false}
                />
              ),
            enableColumnFilter: false,
            enableSorting: false,
            size: width,
            maxSize: width,
            minSize: width,
            meta: { stopPropagation: true },
            tableMeta,
          }
        : null,
    [enabled]
  )
