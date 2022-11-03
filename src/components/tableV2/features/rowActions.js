import React from "react"
import Flex from "src/components/templates/flex"

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

const makeRowActions = ({ rowActions, testPrefix }) => {
  const availableRowActions = Object.keys(rowActions).reduce((acc, currentActionKey) => {
    const isActionSupported = supportedRowActions[currentActionKey]
    if (!isActionSupported) return []
    const {
      icon,
      confirmation,
      tooltipText,
      confirmationTitle,
      confirmationMessage,
      confirmLabel,
      declineLabel,
      handleDecline,
      actionButtonDirection,
      disabledTooltipText,
      flavour,
      iconColor,
    } = supportedRowActions[currentActionKey]
    const currentAction = rowActions[currentActionKey]
    acc.push({
      confirmation,
      tooltipText,
      icon,
      id: currentActionKey,
      confirmationTitle,
      confirmationMessage,
      confirmLabel,
      declineLabel,
      handleDecline,
      actionButtonDirection,
      disabledTooltipText,
      flavour,
      iconColor,
      ...currentAction,
    })
    return acc
  }, [])
  if (!availableRowActions || availableRowActions.length < 1) return []
  return [
    {
      id: "actions",
      enableHiding: false,

      header: () => {
        return "Actions"
      },
      cell: ({ row, table }) => {
        return (
          <Flex data-testid="action-cell" height="100%" gap={2}>
            {availableRowActions.map(
              ({
                id,
                icon,
                handleAction,
                tooltipText,
                confirmation,
                confirmationTitle,
                confirmationMessage,
                confirmLabel,
                declineLabel,
                handleDecline,
                actionButtonDirection,
                isDisabled,
                isVisible = true,
                disabledTooltipText,
                dataGa,
                CustomUIAction,
              }) => (
                <Action
                  disabled={
                    isDisabled && typeof isDisabled === "function"
                      ? isDisabled(row.original)
                      : isDisabled
                  }
                  visible={
                    isVisible && typeof isVisible === "function"
                      ? isVisible(row.original)
                      : isVisible
                  }
                  dataGa={typeof dataGa === "function" ? dataGa(row.original) : dataGa}
                  actionButtonDirection={actionButtonDirection}
                  handleDecline={handleDecline}
                  declineLabel={declineLabel}
                  confirmLabel={confirmLabel}
                  confirmationMessage={confirmationMessage}
                  confirmationTitle={confirmationTitle}
                  confirmation={confirmation}
                  key={id}
                  id={id}
                  icon={icon}
                  handleAction={() => handleAction(row.original, table)}
                  tooltipText={tooltipText}
                  testPrefix={testPrefix}
                  currentRow={row}
                  disabledTooltipText={disabledTooltipText}
                  CustomUIAction={CustomUIAction}
                />
              )
            )}
          </Flex>
        )
      },
      enableColumnFilter: false,
      enableSorting: false,
      meta: { stopPropagation: true },
    },
  ]
}

export default makeRowActions
