import React from "react"

import Box from "src/components/templates/box"

import BulkAction from "../components/bulkAction"
import ActionWithDropdown from "../components/actionWithDropdown"

export const supportedBulkActions = {
  delete: {
    icon: "trashcan",
    confirmation: true,
    tooltipText: "Delete",
    confirmationTitle: "Delete Row",
    confirmationMessage: "You are about to delete a row, are you sure you want to continue?",
    confirmLabel: "Yes",
    declineLabel: "No",
    actionButtonDirection: "reverse",
  },
  download: { icon: "download", confirmation: false, tooltipText: "Download" },
  toggleAlarm: { icon: "alarm_off", confirmation: false, tooltipText: "Turn of Alarms" },
  userSettings: { icon: "user", confirmation: false, tooltipText: "User Settings" },
  addEntry: { icon: "plus", alwaysEnabled: true, flavour: "default", iconColor: "white" },
  remove: { icon: "removeNode", confirmation: true, confirmLabel: "Yes", declineLabel: "No" },
  columnVisibility: { icon: "gear", alwaysEnabled: true },
}

//TODO THIS NEEDS TO BE REFACTORED NOW IS WORKING ONLY FOR COLUMN VISIBILITY
const renderActionWithDropdown = ({
  actions,
  columnPinning,
  enableColumnPinning,
  selectedRows,
  table,
  testPrefix,
  isOpen,
  onClose,
}) => {
  if (!actions || !actions.length) return []
  return actions.map(
    ({ id, icon, handleAction, tooltipText, alwaysEnabled, isDisabled, isVisible, ...rest }) => {
      return (
        <ActionWithDropdown
          alwaysEnabled={alwaysEnabled}
          columnPinning={columnPinning}
          enableColumnPinning={enableColumnPinning}
          handleAction={handleAction}
          icon={icon}
          isDisabled={isDisabled}
          isOpen={isOpen}
          isVisible={isVisible}
          key={id}
          onClose={onClose}
          selectedRows={selectedRows}
          table={table}
          tooltipText={tooltipText}
          testPrefix={testPrefix}
          {...rest}
        />
      )
    }
  )
}

const makeColumnVisibilityAction = ({ handleAction, visible }) => ({
  id: "columnVisibility",
  handleAction,
  isVisible: visible,
  icon: "gear",
  alwaysEnabled: true,
})

const makeBulkActions = ({
  bulkActions,
  columnPinning,
  columnVisibilityOptions,
  enableColumnPinning,
  selectedRows,
  table,
  testPrefix,
}) => {
  const columnVisibility = makeColumnVisibilityAction({ ...columnVisibilityOptions })
  const actionsWithDropdown = renderActionWithDropdown({
    actions: [columnVisibility],
    columnPinning,
    enableColumnPinning,
    selectedRows,
    table,
    testPrefix,
    ...columnVisibilityOptions,
  })

  const availableBulkActions = Object.keys({ ...bulkActions }).reduce((acc, currentActionKey) => {
    const isBulkActionSupported = supportedBulkActions[currentActionKey]
    if (!isBulkActionSupported) return acc
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
      alwaysEnabled,
      iconColor,
      flavour,
    } = supportedBulkActions[currentActionKey]
    const currentAction = bulkActions[currentActionKey]
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
      alwaysEnabled,
      iconColor,
      flavour,
      ...currentAction,
    })
    return acc
  }, [])

  if (!availableBulkActions || !availableBulkActions.length) return actionsWithDropdown
  const actions = availableBulkActions.map(
    ({ id, icon, handleAction, tooltipText, alwaysEnabled, isDisabled, isVisible, ...rest }) => {
      return (
        <BulkAction
          key={id}
          id={id}
          icon={icon}
          handleAction={handleAction}
          tooltipText={tooltipText}
          alwaysEnabled={alwaysEnabled}
          isDisabled={isDisabled}
          isVisible={isVisible}
          table={table}
          testPrefix={testPrefix}
          selectedRows={selectedRows}
          {...rest}
        />
      )
    }
  )
  return [...actions, ...actionsWithDropdown]
}

export default makeBulkActions
