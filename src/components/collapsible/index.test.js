import React from "react"
import { renderWithProviders, waitForElementToBeRemoved } from "testUtilities"
import Collapsible from "./index"

it("renders", () => {
  const children = jest.fn().mockReturnValue("hello")
  const { getByTestId } = renderWithProviders(<Collapsible>{children}</Collapsible>)
  expect(getByTestId("collapsible")).toBeVisible()
  expect(children).toBeCalledTimes(0)
})

it("renders open", () => {
  const children = jest.fn().mockReturnValue("hello")
  const { getByTestId, getByText } = renderWithProviders(<Collapsible open>{children}</Collapsible>)
  expect(getByTestId("collapsible")).toBeVisible()
  expect(children).toBeCalledTimes(1)
  expect(getByText("hello")).toBeVisible()
})

it("toggles on", async () => {
  const children = jest.fn().mockReturnValue("hello")
  const { findByText, rerender } = renderWithProviders(<Collapsible>{children}</Collapsible>)
  rerender(<Collapsible open>{children}</Collapsible>)
  await findByText("hello")
  expect(children).toBeCalledTimes(1)
})

it("toggles off", async () => {
  const children = jest.fn().mockReturnValue("hello")
  const { getByText, rerender } = renderWithProviders(<Collapsible open>{children}</Collapsible>)
  rerender(<Collapsible>{children}</Collapsible>)
  await waitForElementToBeRemoved(() => getByText("hello"))
  expect(children).toBeCalledTimes(1)
})

it("toggles off and persists", async () => {
  const children = jest.fn().mockReturnValue("hello")
  const { getByText, rerender } = renderWithProviders(<Collapsible open persist>{children}</Collapsible>)
  rerender(<Collapsible>{children}</Collapsible>)
  await waitForElementToBeRemoved(() => getByText("hello"))
  expect(children).toBeCalledTimes(2)
})
