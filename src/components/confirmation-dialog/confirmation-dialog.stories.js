import React from "react"
import ConfirmationDialog from "./confirmation-dialog"

export const Basic = args => <ConfirmationDialog {...args} />

export default {
  component: ConfirmationDialog,
  args: {
    confirmLabel: "Yes, remove",
    declineLabel: "Cancel",
    hideIcon: false,
    isConfirmDisabled: false,
    isConfirmLoading: false,
    isDeclineDisabled: false,
    isConfirmPositive: false,
    message: "Are you sure?",
    title: "Wait!",
  },
  argTypes: {
    confirmLabel: { control: "text" },
    declineLabel: { control: "text" },
    hideIcon: { control: "boolean" },
    isConfirmDisabled: { control: "boolean" },
    isConfirmLoading: { control: "boolean" },
    isDeclineDisabled: { control: "boolean" },
    isConfirmPositive: { control: "boolean" },
    message: { control: "text" },
    title: { control: "text" },
    handleConfirm: { action: "click Confirm" },
    handleDecline: { action: "click Decline" },
  },
}
