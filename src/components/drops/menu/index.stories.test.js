import { renderWithProviders, screen } from "testUtilities"
import * as stories from "./index.stories"

// Storybook 10 ignores a story-level `component` key and renders the meta component (Menu)
// with no args, so object stories must provide `render`.
const objectStories = Object.entries(stories).filter(
  ([name, story]) => name !== "default" && typeof story === "object"
)

describe("Menu stories", () => {
  it.each(objectStories)("%s provides a render function", (name, story) => {
    expect(typeof story.render).toBe("function")
  })

  it("States renders every row state without crashing", () => {
    const Story = stories.States.render
    renderWithProviders(<Story />)

    // Rows are virtualised (no layout in jsdom), so assert the three dropdown surfaces.
    expect(screen.getAllByRole("listbox")).toHaveLength(3)
  })
})
