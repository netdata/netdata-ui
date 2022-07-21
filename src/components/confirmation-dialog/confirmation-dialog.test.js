import React from "react"
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
})
