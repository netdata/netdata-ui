import React, { useState } from "react"
import { storiesOf } from "@storybook/react"

import ConfirmationDialog from "./confirmation-dialog"

const Story = storiesOf("COMPONENTS|ConfirmationDialog")

Story.add("Confirmation dialog", () => {
  return (
    <ConfirmationDialog
      handleConfirm={() => alert("Pressed confirm")}
      handleDecline={() => alert("Pressed decline")}
      confirmLabel="Yes!!"
      declineLabel="Please dont!"
      title="Are you sure you want to?"
      message="We are about to fullfill your request, there is no return from here? are you sure"
    />
  )
})
