import React from "react"
import { renderWithProviders, screen } from "testUtilities"
import { DefaultTheme } from "@/theme"
import { StatusWord } from "./index"

const light = DefaultTheme.colors

describe("StatusWord", () => {
  it("renders a filled tone dot and a 13px, 500 tone-coloured word", () => {
    renderWithProviders(<StatusWord tone="error">Critical</StatusWord>)
    const word = screen.getByTestId("status-word")
    expect(word).toHaveTextContent("Critical")
    expect(word).toHaveStyleRule("font-size", "13px")
    expect(word).toHaveStyleRule("font-weight", "500")
    expect(word).toHaveStyleRule("color", light.errorSoftText)
    expect(screen.getByTestId("status-word-dot")).toHaveStyleRule("background-color", light.errorSoftText)
    expect(screen.getByTestId("status-word-dot")).toHaveAttribute("aria-hidden", "true")
  })

  it("renders a ring dot when dot is hollow", () => {
    renderWithProviders(
      <StatusWord tone="stale" dot="hollow">
        Stale
      </StatusWord>
    )
    expect(screen.getByTestId("status-word-dot")).toHaveStyleRule(
      "border",
      `1.5px solid ${light.staleSoftText}`
    )
  })

  it("renders an optional muted detail at normal weight", () => {
    renderWithProviders(
      <StatusWord tone="success" detail="4 collectors">
        Running
      </StatusWord>
    )
    const detail = screen.getByTestId("status-word-detail")
    expect(detail).toHaveTextContent("· 4 collectors")
    expect(detail).toHaveStyleRule("color", light.textLite)
    expect(detail).toHaveStyleRule("font-weight", "400")
  })

  it("renders no detail when none is given", () => {
    renderWithProviders(<StatusWord>Idle</StatusWord>)
    expect(screen.queryByTestId("status-word-detail")).not.toBeInTheDocument()
  })

  it("defaults to the neutral text colour and supports muted", () => {
    const { unmount } = renderWithProviders(<StatusWord>Idle</StatusWord>)
    expect(screen.getByTestId("status-word")).toHaveStyleRule("color", light.text)
    unmount()
    renderWithProviders(<StatusWord tone="muted">Disabled</StatusWord>)
    expect(screen.getByTestId("status-word")).toHaveStyleRule("color", light.textLite)
  })

  it("accepts a custom test id", () => {
    renderWithProviders(<StatusWord data-testid="node-status">Live</StatusWord>)
    expect(screen.getByTestId("node-status")).toBeInTheDocument()
    expect(screen.getByTestId("node-status-dot")).toBeInTheDocument()
  })

  it("renders a React node detail after the separator", () => {
    renderWithProviders(
      <StatusWord tone="error" detail={<strong>3 nodes</strong>}>
        Critical
      </StatusWord>
    )
    const detail = screen.getByTestId("status-word-detail")
    expect(detail).toHaveTextContent("· 3 nodes")
    expect(detail.querySelector("strong")).toHaveTextContent("3 nodes")
  })
})
