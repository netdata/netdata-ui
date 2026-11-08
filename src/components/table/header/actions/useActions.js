import { useMemo } from "react"

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
  toggleAlarm: { icon: "alarm_off", confirmation: false, tooltipText: "Toggle alarms" },
  userSettings: { icon: "user", confirmation: false, tooltipText: "User Settings" },
  addEntry: {
    icon: "plus",
    alwaysEnabled: true,
    flavour: "default",
    iconColor: "white",
    tooltipText: "Add entry",
  },
  remove: {
    icon: "removeNode",
    confirmation: true,
    tooltipText: "Remove",
    confirmLabel: "Yes",
    declineLabel: "No",
  },
  columnVisibility: { icon: "columns", alwaysEnabled: true, tooltipText: "Columns" },
}

export default actions =>
  useMemo(() => {
    if (!actions) return []

    return Object.keys(actions).map(actionKey => ({
      ...(supportedBulkActions[actionKey] || supportedBulkActions.delete),
      ...actions[actionKey],
      id: actionKey,
    }))
  }, [actions])
