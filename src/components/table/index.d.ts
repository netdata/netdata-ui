import {
  ColumnDef,
  FilterFnOption,
  ColumnFiltersState,
  PaginationState,
  ColumnPinningState,
  VisibilityTableState,
  Table,
  Row,
} from "@tanstack/table-core"
import { ComponentType, ReactNode } from "react"
import { supportedBulkActions } from "./header/actions/useActions"
import { supportedRowActions } from "./useColumns/useRowActions"

type NetdataCoreColumns<T = any> = Pick<ColumnDef<T>, "id" | "header" | "cell" | "filterFn">

type LargeDataSource<D = any> = {
  forEachExportRow?: (callback: (row: D, id: string) => void) => void
  forEachRow?: (callback: (row: D, id: string) => void) => void
  getDisplayIndex?: (rowId: string, options?: { leaf?: boolean }) => number
  getEstimatedRowHeight?: (index: number) => number | undefined
  getFlatRowCount?: () => number
  getRow: (index: number) => D
  getRowCount: () => number
  getRowId: (index: number) => string
}

export type TableProps<T = any, D = any> = {
  data: Array<D>
  dataColumns: Array<NetdataCoreColumns<T>>
  enableSorting?: boolean
  paginationOptions?: PaginationState
  columnPinningOptions?: ColumnPinningState
  enableSelection?: boolean
  enablePagination?: boolean
  bulkActions?: {
    [K in keyof typeof supportedBulkActions]?: {
      handleAction: (rowData: D, instance: Table<D>) => void
      icon?: string
      confirmation?: boolean
      tooltipText?: string
      confirmationTitle?: string
      confirmationMessage?: string
      confirmLabel?: string
      declineLabel?: string
      actionButtonDirection?: "default" | "reverse"
    }
  }
  rowActions?: {
    [K in keyof typeof supportedRowActions]?: {
      handleAction: (rowData: D, instance: Table<D>) => void
      icon?: string
      confirmation?: boolean
      tooltipText?: string
      confirmationTitle?: string
      confirmationMessage?: string
      confirmLabel?: string
      declineLabel?: string
      actionButtonDirection?: "default" | "reverse"
      isDisabled?: boolean | ((rowData: D) => boolean)
      isVisible?: boolean | ((rowData: D) => boolean)
    }
  }
  testPrefix?: string
  globalFilterFn?: FilterFnOption<T>
  columnVisibility?: VisibilityTableState
  enableColumnVisibility?: boolean
  enableColumnPinning?: boolean
  onGlobalSearchChange?: (value: any) => void
  onRowSelected?: (value: any) => void
  onClickRow?: (value: any) => void
  onHoverCell?: (value: any) => void
  disableClickRow?: (value: any) => void
  RowWrapper?: ComponentType<{
    children: ReactNode
    row: Row<D>
    virtualIndex: number
    logicalIndex?: number
  }>

  /**This is an escape hatch test id generator, we use this when we want to have
   * dynamic generator tesids depending on the row values
   */
  testPrefixCallback?: (rowData: D) => string
  largeDataOptions?: {
    enabled?: boolean
    filterRow?: (row: D, globalFilter: any) => boolean
    getEstimatedRowHeight?: (row: D, index: number) => number | undefined
    initialRowCount?: number
    sortingFns?: Record<string, Function>
    source?: LargeDataSource<D>
  }
}

declare const Table: (props: TableProps) => JSX.Element
declare const createLargeDataSource: <D = any>(options: {
  columns: Array<any>
  columnFilters?: ColumnFiltersState
  data: Array<D>
  expanded?: boolean | Record<string, boolean>
  filterFns?: Record<string, Function>
  filterRow?: (row: D, index: number) => boolean
  getEstimatedRowHeight?: (row: D, index: number) => number | undefined
  getRowId: (row: D, index: number) => string
  sorting?: Array<{ id: string; desc?: boolean }>
  sortingFns?: Record<string, Function>
}) => LargeDataSource<D>

export { Table, createLargeDataSource }
export default Table
