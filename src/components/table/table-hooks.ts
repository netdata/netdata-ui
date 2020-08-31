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
  useColumnOrder,
  useGroupBy,
  useSortBy,
  useExpanded,
  useRowSelect,
]
export const blockTableHooks = [...tableHooks, useBlockLayout]
