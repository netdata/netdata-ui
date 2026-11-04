import React from "react"
import { composeStories, setProjectAnnotations } from "@storybook/react"
import { render, screen } from "testUtilities"
import preview from "../../../.storybook/preview"
import * as stories from "./confirmation-dialog.stories"

setProjectAnnotations(preview)
const { Destructive, WithMiddleAction } = composeStories(stories)

// The middle button renders whenever handleMiddle is a function, so stories must not inject one by default.
describe("ConfirmationDialog stories", () => {
  it("Destructive shows only cancel and confirm", () => {
    render(<Destructive />)
    expect(screen.queryByTestId(/middleAction$/)).not.toBeInTheDocument()
    expect(screen.getByTestId(/confirmAction$/)).toBeInTheDocument()
  })

  it("WithMiddleAction still shows a labelled middle button", () => {
    render(<WithMiddleAction />)
    expect(screen.getByTestId(/middleAction$/)).toHaveTextContent("Only this tab")
  })
})
