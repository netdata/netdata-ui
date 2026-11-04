import React from "react"
import { composeStories, setProjectAnnotations } from "@storybook/react"
import { render, screen, user } from "testUtilities"
import preview from "../../../.storybook/preview"
import * as stories from "./tabs.stories"

setProjectAnnotations(preview)
const { Basic, Variants } = composeStories(stories)

// Tabs become controlled whenever onChange is a function, so the story must not inject one.
it("Basic story switches tabs on click", async () => {
  render(<Basic />)
  await user().click(screen.getByText("Nodes"))
  expect(screen.getByText("Nodes content")).toBeInTheDocument()
})

it("Variants story shows line and contained strips with icons and counts", () => {
  render(<Variants />)
  expect(screen.getAllByRole("tablist")).toHaveLength(3)
  expect(screen.getAllByText("128")).toHaveLength(2)
  expect(screen.getAllByText("Nodes")[0].parentElement.querySelector("svg")).not.toBeNull()
})
