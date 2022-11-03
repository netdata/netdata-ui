import React from "react"

import Box from "src/components/templates/box"

import BulkAction from "../bulkAction"
import ActionWithDropdown from "../actionWithDropdown"

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
  addEntry: { icon: "plus", alwaysEnabled: true, flavour: "default" },
  remove: { icon: "removeNode", confirmation: true, confirmLabel: "Yes", declineLabel: "No" },
  columnVisibillity: { icon: "gear", alwaysEnabled: true },
}

const renderActionWithDropdown = ({
  actions,
  table,
  testPrefix,
  selectedRows,
  isOpen,
  onClose,
}) => {
  if (!actions || !actions.length) return <Box aria-hidden as="span" />
  return actions.map(
    ({ id, icon, handleAction, tooltipText, alwaysEnabled, isDisabled, isVisible }) => {
      console.log({ icon })
      return (
        <ActionWithDropdown
          key={id}
          isVisible={isVisible}
          alwaysEnabled={alwaysEnabled}
          isDisabled={isDisabled}
          tooltipText={tooltipText}
          icon={icon}
          handleAction={handleAction}
          table={table}
          testPrefix={testPrefix}
          selectedRows={selectedRows}
          isOpen={isOpen}
          onClose={onClose}
        />
      )
    }
  )
}

const makeColumnVisibillityAction = ({ handleAction, visible }) => {
  const prepareColumnVisibilityAction = {
    id: "columnVisibility",
    handleAction,
    visible,
    icon: "gear",
    alwaysEnabled: true,
  }

  return prepareColumnVisibilityAction
}

const makeBulkActions = ({
  bulkActions,
  table,
  testPrefix,
  selectedRows,
  columnVisibilityOptions,
}) => {
  const columnVisibility = makeColumnVisibillityAction({ ...columnVisibilityOptions })
  const actionsWithDropdown = renderActionWithDropdown({
    actions: [columnVisibility],
    ...columnVisibilityOptions,
    testPrefix,
    table,
    selectedRows,
  })

  const availableBulkActions = Object.keys({ ...bulkActions, columnVisibility }).reduce(
    (acc, currentActionKey) => {
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
    },
    []
  )

  if (!availableBulkActions || !availableBulkActions.length) return []
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
