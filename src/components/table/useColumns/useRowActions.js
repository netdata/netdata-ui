import React, { useMemo } from "react"
import Flex from "@/components/templates/flex"

import Action from "../components/action"

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

export default (rowActions, { testPrefix, tableMeta } = {}) => {
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

  if (availableRowActions.length < 1) return null

  return useMemo(
    () => ({
      id: "actions",
      enableHiding: false,
      enableResizing: false,
      header: "Actions",
      cell: ({ row, table }) => (
        <Flex
          data-testid="action-cell"
          height="100%"
          gap={2}
          justifyContent="end"
          onClick={e => e.stopPropagation()}
        >
          {availableRowActions.map(
            ({
              id,
              handleAction,
              isDisabled,
              isVisible = true,
              dataGa,
              disabledTooltipText,
              ...rest
            }) => (
              <Action
                {...rest}
                disabled={typeof isDisabled === "function" ? isDisabled(row.original) : isDisabled}
                visible={typeof isVisible === "function" ? isVisible(row.original) : isVisible}
                dataGa={typeof dataGa === "function" ? dataGa(row.original) : dataGa}
                disabledTooltipText={
                  typeof disabledTooltipText === "function"
                    ? disabledTooltipText(row.original)
                    : disabledTooltipText
                }
                key={id}
                id={id}
                handleAction={() => handleAction(row.original, table)}
                testPrefix={testPrefix}
                currentRow={row}
              />
            )
          )}
        </Flex>
      ),
      enableColumnFilter: false,
      enableSorting: false,
      tableMeta,
      size: availableRowActions.length * 35 < 60 ? 60 : availableRowActions.length * 35,
      meta: {
        cellStyles: {
          justifyContent: "end",
        },
      },
      notFlex: true,
    }),
    [availableRowActions]
  )
}
