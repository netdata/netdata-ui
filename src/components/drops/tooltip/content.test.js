import React from "react"
import { renderWithProviders, screen } from "testUtilities"
import Content from "./content"

describe("Tooltip Content component", () => {
  test("should render component with all elements", () => {
    renderWithProviders(<Content content="Description" icon="copy" title="Tooltip" />)

    expect(screen.getByTestId("tooltip-content")).toBeInTheDocument()
    expect(screen.getByTestId("tooltip-header")).toBeInTheDocument()
    expect(screen.getByTestId("tooltip-icon")).toBeInTheDocument()
    expect(screen.getByTestId("tooltip-title")).toBeInTheDocument()
    expect(screen.getByTestId("tooltip-title")).toHaveTextContent("Tooltip")
    expect(screen.getByTestId("tooltip-description")).toBeInTheDocument()
    expect(screen.getByTestId("tooltip-description")).toHaveTextContent("Description")
  })

  test("should render component with title and icon", () => {
    renderWithProviders(<Content icon="copy" title="Tooltip" />)

    expect(screen.getByTestId("tooltip-content")).toBeInTheDocument()
    expect(screen.getByTestId("tooltip-header")).toBeInTheDocument()
    expect(screen.getByTestId("tooltip-icon")).toBeInTheDocument()
    expect(screen.getByTestId("tooltip-title")).toBeInTheDocument()
    expect(screen.queryByTestId("tooltip-description")).not.toBeInTheDocument()
  })

  test("should render component with title", () => {
    renderWithProviders(<Content title="Tooltip" />)

    expect(screen.getByTestId("tooltip-content")).toBeInTheDocument()
    expect(screen.getByTestId("tooltip-header")).toBeInTheDocument()
    expect(screen.queryByTestId("tooltip-icon")).not.toBeInTheDocument()
    expect(screen.getByTestId("tooltip-title")).toBeInTheDocument()
  })

  test("should render component with content", () => {
    renderWithProviders(<Content content="Description" />)

    expect(screen.getByTestId("tooltip-content")).toBeInTheDocument()
    expect(screen.queryByTestId("tooltip-header")).not.toBeInTheDocument()
    expect(screen.getByTestId("tooltip-description")).toBeInTheDocument()
  })
})
