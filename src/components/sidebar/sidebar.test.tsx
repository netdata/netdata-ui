import "@testing-library/jest-dom/extend-expect"
import { Sidebar } from "./sidebar"
import { DefaultTheme } from "../../theme/default"
import { testWrapper } from "../../../test-utils"

describe("Sidebar component test", () => {
  it(" * should render with no props", () => {
    const { container } = testWrapper(Sidebar, null, DefaultTheme, {})
    const result = container.querySelector("aside")
    expect(result && result.textContent).not.toBeNull()
  })
  it(" * should render on the right side", () => {
    const { container } = testWrapper(Sidebar, { right: true }, DefaultTheme, {})
    const result = container.querySelector("aside")
    expect(result && result.textContent).not.toBeNull()
  })
  it(" * should render with children", () => {
    const { queryByText } = testWrapper(Sidebar, { children: "some text" }, DefaultTheme, {})
    const result = queryByText("some text")
    expect(result && result.textContent).not.toBeNull()
  })
  it(" * should render with children", () => {
    const { queryByText } = testWrapper(
      Sidebar,
      { children: "some text", info: "static text" },
      DefaultTheme,
      {}
    )
    const sidebarElement = queryByText("some text")
    const staticComponent = queryByText("static text")
    expect(sidebarElement && sidebarElement.textContent).toBe("some text")
    expect(staticComponent && staticComponent.textContent).toBe("static text")
  })
})
