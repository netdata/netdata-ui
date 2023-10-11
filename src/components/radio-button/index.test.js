import React from "react"
import { renderWithProviders, fireEvent } from "testUtilities"
import { DefaultTheme } from "@/theme/default"
import RadioButton from "./index"

const getSelectors = container => {
  const input = container.querySelector("input")
  const iconContainer = input.nextSibling
  const svg = container.querySelector("svg")
  return { input, iconContainer, svg }
}

it("renders", () => {
  const { container } = renderWithProviders(<RadioButton />)
  const { input, iconContainer, svg } = getSelectors(container)
  expect(input).not.toHaveAttribute("checked")
  expect(iconContainer).toHaveStyleRule("border", `1px solid ${DefaultTheme.colors.inputBorder}`)
  expect(svg).toBe(null)
})

it("renders checked", () => {
  const { container } = renderWithProviders(<RadioButton checked onChange={jest.fn()} />)
  const { input, iconContainer, svg } = getSelectors(container)
  expect(input).toHaveAttribute("checked")
  expect(iconContainer).toHaveStyleRule("border", `1px solid ${DefaultTheme.colors.inputBorder}`)
  expect(svg).toHaveStyleRule("fill", DefaultTheme.colors.primary)
})

it("renders disabled", () => {
  const { container } = renderWithProviders(<RadioButton disabled />)
  const { input, iconContainer, svg } = getSelectors(container)
  expect(input).not.toHaveAttribute("checked")
  expect(input).toHaveAttribute("disabled")
  expect(iconContainer).toHaveStyleRule("border", `1px solid ${DefaultTheme.colors.disabled}`)
  expect(svg).toBe(null)
})

it("renders disabled checked", () => {
  const { container } = renderWithProviders(<RadioButton checked disabled onChange={jest.fn()} />)
  const { input, iconContainer, svg } = getSelectors(container)
  expect(input).toHaveAttribute("checked")
  expect(input).toHaveAttribute("disabled")
  expect(iconContainer).toHaveStyleRule("border", `1px solid ${DefaultTheme.colors.inputBorder}`)
  expect(svg).toHaveStyleRule("fill", DefaultTheme.colors.disabled)
})

it("triggers change", () => {
  const onChange = jest.fn()
  const { container } = renderWithProviders(<RadioButton onChange={onChange} />)
  fireEvent.click(container.firstChild)
  expect(onChange).toBeCalledTimes(1)
})

it("renders label", () => {
  const { getByLabelText } = renderWithProviders(<RadioButton label="my label" />)
  expect(getByLabelText("my label")).toBeInTheDocument()
})

it("renders children", () => {
  const { getByLabelText } = renderWithProviders(
    <RadioButton>
      <span>my content</span>
    </RadioButton>
  )
  expect(getByLabelText("my content")).toBeInTheDocument()
})
