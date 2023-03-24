import React from "react"
import { storiesOf } from "@storybook/react"
import { boolean } from "@storybook/addon-knobs"

import ConfirmationDialog from "./confirmation-dialog"

const Story = storiesOf("Utils/ConfirmationDialog", module)

Story.add("Confirmation dialog", () => {
  return (
    <ConfirmationDialog
      confirmLabel="Yes"
      declineLabel="Please don't!"
      handleConfirm={() => alert("Pressed confirm")}
      handleDecline={() => alert("Pressed decline")}
      isConfirmPositive={boolean("isConfirmPositive", false)}
      message="We are about to fulfill your request, there is no return from here. Are you sure?"
      title="Are you sure you want to proceed?"
    />
  )
})

Story.add("Confirmation dialog with loading", () => {
  return (
    <ConfirmationDialog
      confirmLabel="Yes"
      declineLabel="Please don't!"
      handleConfirm={(_, toggleLoading) => {
        console.log("Pressed confirm")
        setTimeout(() => toggleLoading(), 2000)
      }}
      handleDecline={() => alert("Pressed decline")}
      isConfirmPositive={boolean("isConfirmPositive", false)}
      message="We are about to fulfill your request, there is no return from here. Are you sure?"
      title="Are you sure you want to proceed?"
      showConfirmLoading={boolean("showConfirmLoading", true)}
      disableConfirmOnLoading={boolean("disableConfirmOnLoading", true)}
    />
  )
})
