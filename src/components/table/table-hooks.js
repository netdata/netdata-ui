import {
  useSortBy,
  useRowSelect,
  useGroupBy,
  useExpanded,
  useColumnOrder,
  useBlockLayout,
  useGlobalFilter,
  usePagination,
} from "react-table"

export const tableHooks = [
  useGlobalFilter,
  useColumnOrder,
  useGroupBy,
  useSortBy,
  useExpanded,
  usePagination,
  useRowSelect,
]
export const blockTableHooks = [...tableHooks, useBlockLayout]
