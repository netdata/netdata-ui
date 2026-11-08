import React, { useMemo } from "react"
import { useTheme } from "styled-components"
import { controlHeight } from "@/mixins/controlSize"
import RowActionGroup from "../components/rowActionGroup"

export const supportedRowActions = {
  delete: {
    icon: "trashcan",
    confirmation: true,
    tooltipText: "Delete",
    confirmationTitle: "Delete Row",
    confirmationMessage: "You are about to delete a row, are you sure?",
    confirmLabel: "Yes",
    declineLabel: "No",
    actionButtonDirection: "reverse",
    disabledTooltipText: "Delete is disabled",
  },
  edit: { icon: "pencilOutline", confirmation: false, tooltipText: "Edit" },
  replace: {
    icon: "refresh",
    confirmation: true,
    tooltipText: "Replace",
    confirmationTitle: "Replace Row",
    confirmationMessage: "You are about to replace a row, are you sure you want to continue?",
    confirmLabel: "Yes",
    declineLabel: "No",
    actionButtonDirection: "reverse",
  },
  info: { icon: "information", confirmation: false, tooltipText: "Information" },
  toggleAlarm: { icon: "alarm_off", confirmation: false, tooltipText: "Turn of Alarms" },
  userSettings: { icon: "user", confirmation: false, tooltipText: "User Settings" },
  remove: {
    icon: "removeNode",
    confirmation: true,
    actionButtonDirection: "reverse",
    confirmLabel: "Yes",
    declineLabel: "No",
  },
  goto: {
    icon: "nav_arrow_goto",
    confirmation: false,
    tooltipText: "Go to",
  },
}

const MIN_ACTIONS_COLUMN_WIDTH = 70

export default (rowActions, { testPrefix, tableMeta } = {}) => {
  const theme = useTheme()
  const { SIZE_SUB_UNIT } = theme.constants
  const actionHeight = Number.parseFloat(controlHeight("default")({ theme }))
  const availableRowActions = useMemo(
    () =>
      Object.keys(rowActions).reduce((acc, key) => {
        const defaultAction = supportedRowActions[key] || supportedRowActions.delete

        const currentAction = rowActions[key]

        acc.push({
          id: key,
          ...defaultAction,
          ...currentAction,
        })
        return acc
      }, []),
    [rowActions]
  )

  return useMemo(() => {
    if (availableRowActions.length < 1) return null

    const visibleSlots = Math.min(availableRowActions.length, 4)
    return {
      id: "actions",
      enableResizing: false,
      header: "Actions",
      headerString: "Actions",
      cell: ({ row, table, inline }) => (
        <RowActionGroup
          inline={inline}
          actions={availableRowActions}
          row={row}
          table={table}
          testPrefix={testPrefix}
        />
      ),
      enableColumnFilter: false,
      enableSorting: false,
      enableReordering: false,
      tableMeta,
      size: Math.max(
        MIN_ACTIONS_COLUMN_WIDTH,
        visibleSlots * actionHeight + (visibleSlots - 1) * 2 * SIZE_SUB_UNIT + 4 * SIZE_SUB_UNIT
      ),
      minSize: actionHeight + 4 * SIZE_SUB_UNIT,
      align: "center",
      notFlex: true,
      meta: {
        cellStyles: {
          justifyContent: "end",
        },
      },
    }
  }, [availableRowActions, actionHeight, SIZE_SUB_UNIT, testPrefix, tableMeta])
}
