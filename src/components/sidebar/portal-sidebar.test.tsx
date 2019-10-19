import "@testing-library/jest-dom/extend-expect"
import { act } from "react-dom/test-utils"
import { PortalSidebar } from "./portaled-sidebar"
import { DefaultTheme } from "../../theme/default"
import { testWrapper } from "../../../test-utils"

const TEST_ANCHOR = "test text"

describe("PortalSidebar component test", () => {
  it(" * should render with no props", () => {
    const { container } = testWrapper(PortalSidebar, null, DefaultTheme, {})
    // somehow queryselector does not searches for monotags like <aside />
    const aside = container && container.nextSibling && container.nextSibling.firstChild
    expect(aside && aside.nodeName).toBe("ASIDE")
  })
  it(" * should render on the right side", () => {
    const { queryByText } = testWrapper(
      PortalSidebar,
      { right: true, children: TEST_ANCHOR },
      DefaultTheme,
      {}
    )
    const result = queryByText(TEST_ANCHOR)
    expect(result && result.textContent).not.toBeNull()
  })
  it(" * should render with children", () => {
    const { queryByText } = testWrapper(PortalSidebar, { children: TEST_ANCHOR }, DefaultTheme, {})
    const result = queryByText(TEST_ANCHOR)
    expect(result && result.textContent).toBe(TEST_ANCHOR)
  })

  it(" * should be closed after `Esc` pressed", () => {
    const handler = jest.fn()
    const { queryByText } = testWrapper(
      PortalSidebar,
      { children: TEST_ANCHOR, closeOnEsc: true, onClose: handler },
      DefaultTheme,
      {}
    )
    const result = queryByText(TEST_ANCHOR)
    if (result) {
      act(() => {
        // @ts-ignore
        const event = new KeyboardEvent("keydown", { keyCode: 27 })
        document.dispatchEvent(event)
      })
    }
    expect(handler).toHaveBeenCalledTimes(1)
  })
})
