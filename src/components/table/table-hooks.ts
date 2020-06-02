import {
  useSortBy,
  useRowSelect,
  useGroupBy,
  useExpanded,
  useColumnOrder,
  useBlockLayout,
  useGlobalFilter,
} from "react-table"

export const tableHooks = [
  useGlobalFilter,
  useGroupBy,
  useColumnOrder,
  useSortBy,
  useRowSelect,
  useExpanded,
]
export const blockTableHooks = [...tableHooks, useBlockLayout]
