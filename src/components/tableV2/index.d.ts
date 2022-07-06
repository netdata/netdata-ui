import { ColumnDef, PaginationState, FilterFnOption } from "@tanstack/react-table"
import { supportedRowActions, supportedBulkActions } from "./netdataTable"

type NetdataCoreColumns<T = any> = Pick<ColumnDef<Array<T>>, "id" | "header" | "cell" | "filterFn">

export type NetdataTableProps<T = any> = {
  data: Array<any>
  dataColumns: Array<NetdataCoreColumns<T>>
  enableSorting?: boolean
  paginationOptions?: PaginationState
  enableSelection?: boolean
  enablePagination?: boolean
  bulkActions?: {
    [K in keyof typeof supportedBulkActions]: {
      icon: string
      confirmation: boolean
      tooltipText: string
      confirmationTitle: string
      confirmationMessage: string
      confirmLabel: string
      declineLabel: string
      actionButtonDirection: "default" | "reverse"
    }
  }
  rowActions?: {
    [K in keyof typeof supportedRowActions]: {
      icon: string
      confirmation: boolean
      tooltipText: string
      confirmationTitle: string
      confirmationMessage: string
      confirmLabel: string
      declineLabel: string
      actionButtonDirection: "default" | "reverse"
    }
  }
  testPrefix?: string
  globalFilterFn?: FilterFnOption<Array<any>>
  onGlobalSearchChange?: (value: any) => void
  onRowSelected?: (value: any) => void
  onClickRow?: (value: any) => void
}

declare const NetdataTable: (props: NetdataTableProps) => JSX.Element

export { NetdataTable }
export default NetdataTable
