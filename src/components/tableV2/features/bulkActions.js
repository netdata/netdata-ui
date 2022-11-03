import React from "react"

import BulkAction from "../bulkAction"
import Box from "src/components/templates/box"

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

const makeBulkActions = ({ bulkActions, table, testPrefix, selectedRows }) => {
  if (!bulkActions || !bulkActions.length) return <Box aria-hidden as="span" key="empty-box" />
  return bulkActions.map(
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
}

export default makeBulkActions
