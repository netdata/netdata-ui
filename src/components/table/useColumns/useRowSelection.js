import React, { useMemo } from "react"
import { Checkbox } from "@/components/checkbox"
import Flex from "@/components/templates/flex"

const width = 32

export default (enabled, { testPrefix, tableMeta }) =>
  useMemo(
    () =>
      enabled
        ? {
            id: "checkbox",
            enableHiding: false,
            enableResizing: false,
            header: ({ table }) => (
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
            ),
            cell: ({ row }) =>
              row.original?.disabled !== "hidden" && (
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
    [enabled]
  )
