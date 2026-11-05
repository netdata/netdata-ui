import React from "react"
import { renderWithProviders, waitForElementToBeRemoved } from "testUtilities"
import Collapsible from "./index"

it("renders", () => {
  const children = jest.fn().mockReturnValue("hello")
  const { getByTestId } = renderWithProviders(<Collapsible>{children}</Collapsible>)
  expect(getByTestId("collapsible")).toBeVisible()
  expect(children).toHaveBeenCalledTimes(0)
})

it("renders open", () => {
  const children = jest.fn().mockReturnValue("hello")
  const { getByTestId, getByText } = renderWithProviders(<Collapsible open>{children}</Collapsible>)
  expect(getByTestId("collapsible")).toBeVisible()
  expect(children).toHaveBeenCalledTimes(1)
  expect(getByText("hello")).toBeVisible()
})

it("toggles on", async () => {
  const children = jest.fn().mockReturnValue("hello")
  const { findByText, rerender } = renderWithProviders(<Collapsible>{children}</Collapsible>)
  rerender(<Collapsible open>{children}</Collapsible>)
  await findByText("hello")
  expect(children).toHaveBeenCalledTimes(1)
})

it("toggles off", async () => {
  const children = jest.fn().mockReturnValue("hello")
  const { getByText, rerender } = renderWithProviders(<Collapsible open>{children}</Collapsible>)
  rerender(<Collapsible>{children}</Collapsible>)
  await waitForElementToBeRemoved(() => getByText("hello"))
  expect(children).toHaveBeenCalledTimes(1)
})

it("toggles off and persists", async () => {
  const children = jest.fn().mockReturnValue("hello")
  const { getByText, rerender } = renderWithProviders(
    <Collapsible open persist>
      {children}
    </Collapsible>
  )
  rerender(<Collapsible>{children}</Collapsible>)
  await waitForElementToBeRemoved(() => getByText("hello"))
  expect(children).toHaveBeenCalledTimes(2)
})

describe("motion", () => {
  it("eases out on state changes", () => {
    const { getByTestId } = renderWithProviders(<Collapsible>hello</Collapsible>)
    expect(getByTestId("collapsible")).toHaveStyleRule("transition", "max-height 0ms ease-out")
  })

  it("animates width when horizontal", () => {
    const { getByTestId } = renderWithProviders(
      <Collapsible direction="horizontal">hello</Collapsible>
    )
    expect(getByTestId("collapsible")).toHaveStyleRule("transition", "max-width 0ms ease-out")
  })

  it("drops the transition for users who prefer reduced motion", () => {
    const { getByTestId } = renderWithProviders(<Collapsible>hello</Collapsible>)
    expect(getByTestId("collapsible")).toHaveStyleRule("transition", "none", {
      media: "(prefers-reduced-motion:reduce)",
    })
  })

  it("clips content while closed", () => {
    const { getByTestId } = renderWithProviders(<Collapsible overflow="auto">hello</Collapsible>)
    expect(getByTestId("collapsible")).toHaveStyleRule("overflow", "hidden")
  })

  it("keeps the open attribute that consumers query", () => {
    const { getByTestId } = renderWithProviders(<Collapsible open>hello</Collapsible>)
    expect(getByTestId("collapsible")).toHaveAttribute("open")
  })
})
