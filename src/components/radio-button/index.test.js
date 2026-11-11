import { css } from "styled-components"
import { renderWithProviders, fireEvent, screen, user } from "testUtilities"
import { DefaultTheme } from "@/theme/default"
import RadioButton from "./index"
import { Container, Input } from "./styled"

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
  expect(iconContainer).toHaveStyleRule("border", `1px solid ${DefaultTheme.colors.textLite}`)
  expect(svg).toBe(null)
})

it("renders checked", () => {
  const { container } = renderWithProviders(<RadioButton checked onChange={jest.fn()} />)
  const { input, iconContainer, svg } = getSelectors(container)
  expect(input).toHaveAttribute("checked")
  expect(iconContainer).toHaveStyleRule("border", `1px solid ${DefaultTheme.colors.primary}`)
  expect(svg).toHaveStyleRule("fill", DefaultTheme.colors.primary)
})

it("renders disabled", () => {
  const { container } = renderWithProviders(<RadioButton disabled />)
  const { input, iconContainer, svg } = getSelectors(container)
  expect(input).not.toHaveAttribute("checked")
  expect(input).toHaveAttribute("disabled")
  expect(iconContainer).toHaveStyleRule("border", `1px solid ${DefaultTheme.colors.textLite}`)
  expect(container.firstChild).toHaveStyleRule("opacity", "0.4")
  expect(svg).toBe(null)
})

it("renders disabled checked", () => {
  const { container } = renderWithProviders(<RadioButton checked disabled onChange={jest.fn()} />)
  const { input, iconContainer, svg } = getSelectors(container)
  expect(input).toHaveAttribute("checked")
  expect(input).toHaveAttribute("disabled")
  expect(iconContainer).toHaveStyleRule("border", `1px solid ${DefaultTheme.colors.primary}`)
  expect(svg).toHaveStyleRule("fill", DefaultTheme.colors.primary)
  expect(container.firstChild).toHaveStyleRule("opacity", "0.4")
})

it("triggers change", () => {
  const onChange = jest.fn()
  const { container } = renderWithProviders(<RadioButton onChange={onChange} />)
  fireEvent.click(container.firstChild)
  expect(onChange).toHaveBeenCalledTimes(1)
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

it("draws a 6px dot", () => {
  const { container } = renderWithProviders(<RadioButton checked onChange={jest.fn()} />)
  const { svg } = getSelectors(container)
  expect(svg).toHaveStyleRule("width", "6px")
  expect(svg).toHaveStyleRule("height", "6px")
})

it("centres the ring on the label with an 8px gap", () => {
  const { container } = renderWithProviders(<RadioButton label="Average" />)
  const { iconContainer } = getSelectors(container)
  expect(iconContainer).toHaveStyleRule("margin", "0 8px 0 0")
})

it("steps the ring when an unchecked row is hovered", () => {
  const { container } = renderWithProviders(<RadioButton label="Average" />)
  const { iconContainer } = getSelectors(container)
  expect(iconContainer).toHaveStyleRule("border-color", DefaultTheme.colors.text, {
    modifier: css`
      ${Container}:hover ${Input}:not(:checked)+&
    `,
  })
})

it("draws the primary focus ring when the input has keyboard focus", () => {
  const { container } = renderWithProviders(<RadioButton label="Average" />)
  const { iconContainer } = getSelectors(container)
  const options = {
    modifier: css`
      ${Input}:focus-visible+&
    `,
  }
  expect(iconContainer).toHaveStyleRule(
    "outline",
    `2px solid ${DefaultTheme.colors.primary}`,
    options
  )
  expect(iconContainer).toHaveStyleRule("outline-offset", "2px", options)
})

it("animates the ring unless reduced motion is requested", () => {
  const { container } = renderWithProviders(<RadioButton />)
  const { iconContainer } = getSelectors(container)
  expect(iconContainer).toHaveStyleRule("transition", expect.stringContaining("140ms ease-out"))
  expect(iconContainer).toHaveStyleRule("transition", "none", {
    media: "(prefers-reduced-motion:reduce)",
  })
})

it("selects with the keyboard", async () => {
  const onChange = jest.fn()
  renderWithProviders(<RadioButton label="Average" name="agg" value="avg" onChange={onChange} />)
  await user().tab()
  expect(screen.getByRole("radio")).toHaveFocus()
  await user().keyboard(" ")
  expect(onChange).toHaveBeenCalledTimes(1)
})

it("cannot be selected when disabled", async () => {
  const onChange = jest.fn()
  renderWithProviders(<RadioButton label="Average" disabled onChange={onChange} />)
  fireEvent.click(screen.getByText("Average"))
  expect(onChange).not.toHaveBeenCalled()
  expect(screen.getByRole("radio")).toBeDisabled()
})

it.each([[false], [true]])("draws the ring without a fill (checked: %s)", checked => {
  const { container } = renderWithProviders(<RadioButton checked={checked} onChange={jest.fn()} />)
  const { iconContainer } = getSelectors(container)
  expect(iconContainer).toHaveStyleRule("background", "rgba(255,255,255,0.0)")
})
