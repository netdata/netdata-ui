import "@testing-library/jest-dom/extend-expect"
import { Sidebar } from "./sidebar"
import { DefaultTheme } from "../../theme/default"
import { testWrapper } from "../../../test-utils"
import "jest-styled-components"

const TEST_ANCHOR = "some text"
const TEST_INFO_ANCHOR = "some info text"

describe("Sidebar component test", () => {
  it(" * should render with no props", () => {
    const { container } = testWrapper(Sidebar, null, DefaultTheme, {})
    const result = container.querySelector("aside")
    expect(result && result.textContent).not.toBeNull()
  })
  it(" * should render on the right side", () => {
    const { queryByText } = testWrapper(
      Sidebar,
      { right: true, children: TEST_ANCHOR },
      DefaultTheme,
      {}
    )
    const result = queryByText(TEST_ANCHOR)
    expect(result && result.parentElement).toHaveStyleRule("flex-direction", "row-reverse")
  })
  it(" * should render with children", () => {
    const { queryByText } = testWrapper(Sidebar, { children: TEST_ANCHOR }, DefaultTheme, {})
    const result = queryByText(TEST_ANCHOR)
    expect(result && result.textContent).not.toBeNull()
  })
  it(" * should render with children and with content on sibling side", () => {
    const { queryByText } = testWrapper(
      Sidebar,
      { children: TEST_ANCHOR, info: TEST_INFO_ANCHOR },
      DefaultTheme,
      {}
    )
    const sidebarElement = queryByText(TEST_ANCHOR)
    const staticComponent = queryByText(TEST_INFO_ANCHOR)
    expect(sidebarElement && sidebarElement.textContent).toBe(TEST_ANCHOR)
    expect(staticComponent && staticComponent.textContent).toBe(TEST_INFO_ANCHOR)
  })
})
