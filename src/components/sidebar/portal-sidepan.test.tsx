import "@testing-library/jest-dom/extend-expect"
import { PortalSidebar } from "./portaled-sidebar"
import { DefaultTheme } from "../../theme/default"
import { testWrapper } from "../../../test-utils"

describe("PortalSidebar component test", () => {
  it(" * should render with no props", () => {
    const { container } = testWrapper(PortalSidebar, null, DefaultTheme, {})
    const result = container.querySelector("aside")
    expect(result && result.textContent).toBeNull()
  })
  it(" * should render on the right side", () => {
    const { queryByText } = testWrapper(
      PortalSidebar,
      { right: true, children: "test text" },
      DefaultTheme,
      {}
    )
    const result = queryByText("test text")
    expect(result && result.textContent).not.toBeNull()
  })
  it(" * should render with children", () => {
    const { queryByText } = testWrapper(PortalSidebar, { children: "some text" }, DefaultTheme, {})
    const result = queryByText("some text")
    expect(result && result.textContent).toBe("some text")
  })
})
