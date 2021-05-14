/**
 * @jest-environment jsdom
 */

import React from "react"
import { Sidebar } from "./sidebar"
import { renderWithProviders } from "testUtilities"

const TEST_ANCHOR = "some text"
const TEST_INFO_ANCHOR = "some info text"

describe("Sidebar component test", () => {
  it(" * should render with no props", () => {
    const { container } = renderWithProviders(<Sidebar />)
    const result = container.querySelector("aside")
    expect(result && result.textContent).not.toBeNull()
  })
  it(" * should render on the right side", () => {
    const { queryByText } = renderWithProviders(<Sidebar right>{TEST_ANCHOR}</Sidebar>)
    const result = queryByText(TEST_ANCHOR)
    expect(result && result.parentElement).toHaveStyleRule("flex-direction", "row-reverse")
  })
  it(" * should render with children", () => {
    const { queryByText } = renderWithProviders(<Sidebar>{TEST_ANCHOR}</Sidebar>)
    const result = queryByText(TEST_ANCHOR)
    expect(result && result.textContent).not.toBeNull()
  })
  it(" * should render with children and with content on sibling side", () => {
    const { queryByText } = renderWithProviders(
      <Sidebar info={TEST_INFO_ANCHOR}>{TEST_ANCHOR}</Sidebar>
    )
    const sidebarElement = queryByText(TEST_ANCHOR)
    const staticComponent = queryByText(TEST_INFO_ANCHOR)
    expect(sidebarElement && sidebarElement.textContent).toBe(TEST_ANCHOR)
    expect(staticComponent && staticComponent.textContent).toBe(TEST_INFO_ANCHOR)
  })
})
