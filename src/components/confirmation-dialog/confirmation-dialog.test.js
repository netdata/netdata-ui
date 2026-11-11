import { fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders, screen } from "testUtilities"
import { DefaultTheme } from "@/theme"
import ConfirmationDialog from "./confirmation-dialog"

const defaultProps = {
  handleConfirm: jest.fn(),
  handleDecline: jest.fn(),
  message: "Text for node deletion",
  title: "Delete node",
}

const setup = (props = defaultProps) => renderWithProviders(<ConfirmationDialog {...props} />)

describe("ConfirmationDialog component", () => {
  test("should render component", () => {
    setup()

    expect(screen.queryByTestId("confirmationDialog")).toBeInTheDocument()
    expect(screen.queryByTestId("confirmationDialog-headerContainer")).toBeInTheDocument()
    expect(screen.queryByTestId("confirmationDialog-header")).toBeInTheDocument()
    expect(screen.queryByTestId("confirmationDialog-headerIcon")).toBeInTheDocument()
    expect(screen.queryByTestId("confirmationDialog-headerText")).toBeInTheDocument()
    expect(screen.queryByTestId("confirmationDialog-headerClose")).toBeInTheDocument()
    expect(screen.queryByTestId("confirmationDialog-body")).toBeInTheDocument()
    expect(screen.queryByTestId("confirmationDialog-bodyMessage")).toBeInTheDocument()
    expect(screen.queryByTestId("confirmationDialog-actions")).toBeInTheDocument()
    expect(screen.queryByTestId("confirmationDialog-cancelAction")).toBeInTheDocument()
    expect(screen.queryByTestId("confirmationDialog-confirmAction")).toBeInTheDocument()
  })

  test("should render component without icon", () => {
    setup({ ...defaultProps, hideIcon: true })

    expect(screen.queryByTestId("confirmationDialog-headerIcon")).not.toBeInTheDocument()
  })

  test("should render component with custom body message", () => {
    setup({
      ...defaultProps,
      message: <div data-testid="confirmationDialog-customBodyMessage">Text for node deletion</div>,
    })

    expect(screen.queryByTestId("confirmationDialog-bodyMessage")).not.toBeInTheDocument()
    expect(screen.queryByTestId("confirmationDialog-customBodyMessage")).toBeInTheDocument()
  })

  test("should not render middle action when handleMiddle is not provided", () => {
    setup()

    expect(screen.queryByTestId("confirmationDialog-middleAction")).not.toBeInTheDocument()
  })

  test("should render middle action when handleMiddle is provided", () => {
    setup({
      ...defaultProps,
      handleMiddle: jest.fn(),
      middleLabel: "Delete only this",
    })

    expect(screen.queryByTestId("confirmationDialog-middleAction")).toBeInTheDocument()
  })

  test("clicking middle action fires handleMiddle, not handleDecline", async () => {
    const handleMiddle = jest.fn()
    const handleDecline = jest.fn()
    setup({
      ...defaultProps,
      handleMiddle,
      handleDecline,
      middleLabel: "Delete only this",
    })

    const user = userEvent.setup()
    await user.click(screen.getByTestId("confirmationDialog-middleAction"))

    expect(handleMiddle).toHaveBeenCalledTimes(1)
    expect(handleDecline).not.toHaveBeenCalled()
  })

  test("Escape still fires handleDecline even when middle action is present", () => {
    const handleMiddle = jest.fn()
    const handleDecline = jest.fn()
    setup({
      ...defaultProps,
      handleMiddle,
      handleDecline,
      middleLabel: "Delete only this",
    })

    fireEvent.keyDown(document, { keyCode: 27 })

    expect(handleDecline).toHaveBeenCalledTimes(1)
    expect(handleMiddle).not.toHaveBeenCalled()
  })
})

describe("ConfirmationDialog styling", () => {
  test("title stays an h3 and uses the H4 typography step (17px/21px semibold)", () => {
    setup()
    const title = screen.getByTestId("confirmationDialog-headerText")
    expect(title.tagName).toBe("H3")
    expect(title).toHaveStyleRule("font-size", "17px")
    expect(title).toHaveStyleRule("line-height", "21px")
    expect(title).toHaveStyleRule("font-weight", "600")
    expect(title).toHaveStyleRule("color", DefaultTheme.colors.main)
  })

  test("destructive default tints the 20px header icon with the error colour", () => {
    setup()
    const icon = screen.getByTestId("confirmationDialog-headerIcon")
    expect(icon).toHaveAttribute("color", "error")
    expect(icon).toHaveAttribute("height", "20px")
    expect(icon).toHaveAttribute("width", "20px")
  })

  test("centres the icon on the title line", () => {
    setup()
    expect(screen.getByTestId("confirmationDialog-header")).toHaveStyleRule("align-items", "center")
  })

  test("positive confirmation keeps the header icon neutral", () => {
    setup({ ...defaultProps, isConfirmPositive: true })
    expect(screen.getByTestId("confirmationDialog-headerIcon")).toHaveAttribute("color", "main")
  })

  test("rounded content carries the modal shadow, not the square layer box", () => {
    setup()
    const shadow = DefaultTheme.colors.dropdownShadow
    expect(screen.getByTestId("confirmationDialog")).toHaveStyleRule("border-radius", "8px")
    expect(screen.getByTestId("confirmationDialog")).toHaveStyleRule(
      "box-shadow",
      `0 16px 40px -8px ${shadow},0 2px 6px ${shadow}`
    )
    expect(screen.getByTestId("layer-container")).not.toHaveStyleRule("box-shadow")
  })

  test("does not blur the page behind the dialog by default", () => {
    setup()
    expect(screen.getByTestId("layer-backdrop")).not.toHaveStyleRule("backdrop-filter")
  })

  test("still blurs when the consumer asks for it", () => {
    setup({ ...defaultProps, backdropProps: { backdropBlur: 8 } })
    expect(screen.getByTestId("layer-backdrop")).toHaveStyleRule("backdrop-filter", "blur(8px)")
  })

  test("spaces sections on the 12px rhythm with 16/20 padding", () => {
    setup()
    const content = screen.getByTestId("confirmationDialog")
    expect(content).toHaveStyleRule("padding", "16px 20px")
    expect(content).toHaveStyleRule("gap", "12px")
    expect(screen.getByTestId("confirmationDialog-actions")).toHaveStyleRule("gap", "8px")
  })

  test("aligns the close button with the title line inside the padding", () => {
    setup()
    const close = screen.getByTestId("confirmationDialog-headerClose")
    expect(close).toHaveStyleRule("top", "14px")
    expect(close).toHaveStyleRule("right", "16px")
  })

  test("keeps button order cancel, middle, confirm", () => {
    setup({ ...defaultProps, handleMiddle: jest.fn(), middleLabel: "Only this" })
    const ids = Array.from(screen.getByTestId("confirmationDialog-actions").children).map(node =>
      node.getAttribute("data-testid")
    )
    expect(ids).toEqual([
      "confirmationDialog-cancelAction",
      "confirmationDialog-middleAction",
      "confirmationDialog-confirmAction",
    ])
  })

  test("ignores confirm clicks while loading", async () => {
    const handleConfirm = jest.fn()
    setup({ ...defaultProps, handleConfirm, isConfirmLoading: true })
    await userEvent.setup().click(screen.getByTestId("confirmationDialog-confirmAction"))
    expect(handleConfirm).not.toHaveBeenCalled()
  })

  test("confirm and cancel fire their handlers", async () => {
    const handleConfirm = jest.fn()
    const handleDecline = jest.fn()
    setup({ ...defaultProps, handleConfirm, handleDecline })
    const user = userEvent.setup()
    await user.click(screen.getByTestId("confirmationDialog-confirmAction"))
    await user.click(screen.getByTestId("confirmationDialog-cancelAction"))
    expect(handleConfirm).toHaveBeenCalledTimes(1)
    expect(handleDecline).toHaveBeenCalledTimes(1)
  })

  test("hides the close button when there is no decline handler", () => {
    setup({ ...defaultProps, handleDecline: undefined })
    expect(screen.queryByTestId("confirmationDialog-headerClose")).not.toBeInTheDocument()
    expect(screen.queryByTestId("confirmationDialog-cancelAction")).not.toBeInTheDocument()
  })
})

const rgb = hex => {
  const n = parseInt(hex.slice(1), 16)
  return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`
}

describe("ConfirmationDialog accents", () => {
  // In a destructive dialog red is the only accent, so Cancel is neutral; positive dialogs keep green.
  it("renders a neutral Cancel next to a destructive confirm", () => {
    renderWithProviders(<ConfirmationDialog handleConfirm={() => {}} handleDecline={() => {}} title="Delete node" />)
    expect(getComputedStyle(screen.getByTestId(/cancelAction$/)).color).toBe(rgb(DefaultTheme.colors.text))
  })

  it("keeps the green Cancel in a positive dialog", () => {
    renderWithProviders(
      <ConfirmationDialog isConfirmPositive handleConfirm={() => {}} handleDecline={() => {}} title="Add node" />
    )
    expect(getComputedStyle(screen.getByTestId(/cancelAction$/)).color).toBe(rgb(DefaultTheme.colors.primary))
  })
})
