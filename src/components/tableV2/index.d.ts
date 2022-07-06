import {
  ColumnDef,
  PaginationState,
  FilterFnOption,
  VisibilityTableState,
} from "@tanstack/table-core"
import { supportedRowActions, supportedBulkActions } from "./netdataTable"
import React from "react"

type NetdataCoreColumns<T = any> = Pick<ColumnDef<any>, "id" | "header" | "cell" | "filterFn">

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
  globalFilterFn?: FilterFnOption<any>
  columnVisibility: VisibilityTableState
  onGlobalSearchChange?: (value: any) => void
  onRowSelected?: (value: any) => void
  onClickRow?: (value: any) => void
}

declare const NetdataTable: (props: NetdataTableProps) => JSX.Element

export { NetdataTable }
export default NetdataTable
