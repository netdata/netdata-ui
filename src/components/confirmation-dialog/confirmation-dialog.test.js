import React from "react"
import { fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders, screen } from "testUtilities"
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
