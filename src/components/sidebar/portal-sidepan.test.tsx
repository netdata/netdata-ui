import "@testing-library/jest-dom/extend-expect"
import { PortalSidebar } from "./portaled-sidebar"
import { DefaultTheme } from "../../theme/default"
import { testWrapper } from "../../../test-utils"

const TEST_ANCHOR = "test text"

describe("PortalSidebar component test", () => {
  it(" * should render with no props", () => {
    const { container } = testWrapper(PortalSidebar, { isOpen: true }, DefaultTheme, {})
    const result = container.querySelector("aside")
    expect(result && result.textContent).toBeNull()
  })
  it(" * should render on the right side", () => {
    const { queryByText } = testWrapper(
      PortalSidebar,
      { right: true, children: TEST_ANCHOR, isOpen: true },
      DefaultTheme,
      {}
    )
    const result = queryByText(TEST_ANCHOR)
    expect(result && result.textContent).not.toBeNull()
  })
  it(" * should render with children", () => {
    const { queryByText } = testWrapper(
      PortalSidebar,
      { children: TEST_ANCHOR, isOpen: true },
      DefaultTheme,
      {}
    )
    const result = queryByText(TEST_ANCHOR)
    expect(result && result.textContent).toBe(TEST_ANCHOR)
  })
})
