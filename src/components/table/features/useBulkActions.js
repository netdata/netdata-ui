import React, { useMemo } from "react"
import useToggle from "src/hooks/use-toggle"
import BulkAction from "../components/bulkAction"
import ColumnVisibilityAction from "../components/columnVisibilityAction"

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

const useColumnVisibilityAction = (isVisible, props = {}) => {
  const [isOpen, toggle, , close] = useToggle(false)

  return useMemo(
    () => (
      <ColumnVisibilityAction
        key="columnVisibility"
        {...supportedBulkActions.columnVisibility}
        handleAction={toggle}
        isOpen={isOpen}
        isVisible={isVisible}
        id="columnVisibility"
        onClose={close}
        {...props}
      />
    ),
    [isVisible, isOpen, props.table.getVisibleFlatColumns()]
  )
}

export default ({ bulkActions, enableColumnVisibility, ...props }) => {
  const columnVisibilityAction = useColumnVisibilityAction(enableColumnVisibility, props)

  return useMemo(() => {
    if (!bulkActions) return columnVisibilityAction

    return Object.keys(bulkActions)
      .map(actionKey => {
        const supportedBulkAction = supportedBulkActions[actionKey] || supportedBulkActions.delete
        const bulkAction = bulkActions[actionKey]

        return (
          <BulkAction
            key={actionKey}
            {...props}
            {...supportedBulkAction}
            id={actionKey}
            {...bulkAction}
          />
        )
      })
      .concat(columnVisibilityAction)
  }, [bulkActions, columnVisibilityAction])
}
