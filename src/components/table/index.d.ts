import {
  ColumnDef,
  FilterFnOption,
  PaginationState,
  ColumnPinningState,
  VisibilityTableState,
  Table,
} from "@tanstack/table-core"
import { supportedBulkActions } from "./header/actions/useActions"
import { supportedRowActions } from "./useColumns/useRowActions"

type NetdataCoreColumns<T = any> = Pick<ColumnDef<T>, "id" | "header" | "cell" | "filterFn">

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

  /**This is an escape hatch test id generator, we use this when we want to have
   * dynamic generator tesids depending on the row values
   */
  testPrefixCallback?: (rowData: D) => string
}

declare const Table: (props: TableProps) => JSX.Element

export { Table }
export default Table
