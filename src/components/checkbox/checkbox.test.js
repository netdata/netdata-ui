import { renderWithProviders, user, screen } from "testUtilities"
import { css } from "styled-components"
import { DarkTheme } from "@/theme/dark"
import { DefaultTheme } from "@/theme/default"
import { MockedCheckbox, MockedCheckboxList } from "./checkbox.mock"
import { Checkbox } from "./checkbox"
import { HiddenCheckboxInput } from "./styled"

describe("Checkbox test", () => {
  it(" * should render with required props", () => {
    renderWithProviders(<MockedCheckbox />)
    const result = screen.queryAllByRole("input")
    expect(result).not.toBeNull()
  })

  it(" * should support indeterminate state for checkboxes list", async () => {
    renderWithProviders(<MockedCheckboxList />)
    const checkboxesList = screen.getAllByTestId("checkbox")
    const childCheckbox = checkboxesList[1]

    await user().click(childCheckbox)
    expect(screen.getAllByTestId("checkbox-input")[0]).toHaveAttribute("data-indeterminate")
  })

  it(" * should not be clickable when we are at disabled", async () => {
    const { getByTestId } = renderWithProviders(<MockedCheckbox disabled={true} />)
    const input = getByTestId("checkbox-input")

    await user().click(input)

    expect(input).toBeDisabled()
  })
})

const box = () => screen.getByTestId("styled-checkbox")
const input = () => screen.getByTestId("checkbox-input")

describe("Checkbox visuals", () => {
  it("draws the unchecked box as a hairline with no fill", () => {
    renderWithProviders(<Checkbox checked={false} />)
    expect(box()).toHaveStyleRule("border", `1px solid ${DefaultTheme.colors.textLite}`)
    expect(box()).toHaveStyleRule("background-color", "rgba(255,255,255,0.0)")
    expect(box()).toHaveStyleRule("border-radius", "2px")
  })

  // Lists of checked filters must not turn into a wall of green blocks: green is the edge and mark only.
  it.each([
    ["light", undefined, DefaultTheme.colors.primary],
    ["dark", DarkTheme, "#00AB44"],
  ])("outlines a checked box in green without filling it (%s)", (_, theme, green) => {
    renderWithProviders(<Checkbox checked />, theme && { theme })
    expect(box()).toHaveStyleRule("background-color", "rgba(255,255,255,0.0)")
    expect(box()).toHaveStyleRule("border", `1px solid ${green}`)
    expect(box().querySelector("svg")).toHaveStyleRule("fill", green)
  })

  it("outlines the indeterminate state the same way", () => {
    renderWithProviders(<Checkbox indeterminate />, { theme: DarkTheme })
    expect(box()).toHaveStyleRule("background-color", "rgba(255,255,255,0.0)")
    expect(box()).toHaveStyleRule("border", "1px solid #00AB44")
    expect(box().querySelector("svg")).toHaveStyleRule("fill", "#00AB44")
  })

  it("lets iconProps override the glyph colour", () => {
    renderWithProviders(<Checkbox checked iconProps={{ color: "accent" }} />)
    expect(box().querySelector("svg")).toHaveStyleRule("fill", "#42B861")
  })

  it("keeps the error border", () => {
    renderWithProviders(<Checkbox checkboxProps={{ error: true }} />)
    expect(box()).toHaveStyleRule("border", "1px solid #DB162F")
  })

  it("steps the border when the row is hovered", () => {
    renderWithProviders(<Checkbox label="cpu" />)
    expect(box()).toHaveStyleRule("border-color", DefaultTheme.colors.text, { modifier: "label:hover &" })
  })

  it("keeps the box still on hover when disabled", () => {
    const { rerender } = renderWithProviders(<Checkbox disabled label="cpu" />)
    expect(box()).not.toHaveStyleRule("border-color", expect.anything(), {
      modifier: "label:hover &",
    })
    rerender(<Checkbox checked disabled label="cpu" />)
    expect(box()).not.toHaveStyleRule("border-color", expect.anything(), {
      modifier: "label:hover &",
    })
  })

  it("steps the green edge when a checked row is hovered", () => {
    renderWithProviders(<Checkbox checked label="cpu" />)
    expect(box()).toHaveStyleRule("border-color", DefaultTheme.colors.primaryHover, {
      modifier: "label:hover &",
    })
    expect(box()).not.toHaveStyleRule("background-color", expect.anything(), {
      modifier: "label:hover &",
    })
  })

  it("draws the primary focus ring when the input has keyboard focus", () => {
    renderWithProviders(<Checkbox label="cpu" />)
    const options = {
      modifier: css`
        ${HiddenCheckboxInput}:focus-visible+&
      `,
    }
    expect(box()).toHaveStyleRule("outline", `2px solid ${DefaultTheme.colors.primary}`, options)
    expect(box()).toHaveStyleRule("outline-offset", "2px", options)
  })

  it("puts 8px between box and label", () => {
    renderWithProviders(<Checkbox label="cpu" />)
    expect(screen.getByTestId("checkbox")).toHaveStyleRule("gap", "8px")
  })

  it("dims the whole row once when disabled", () => {
    renderWithProviders(<Checkbox checked disabled label="cpu" />)
    expect(screen.getByTestId("checkbox")).toHaveStyleRule("opacity", "0.4")
    expect(screen.getByText("cpu")).not.toHaveStyleRule("opacity", "0.4")
    expect(box()).toHaveStyleRule("border", `1px solid ${DefaultTheme.colors.primary}`)
  })
})

describe("Checkbox semantics", () => {
  it("reflects checked on the native input", () => {
    renderWithProviders(<Checkbox checked label="cpu" />)
    expect(input()).toBeChecked()
    expect(input()).toHaveAttribute("data-checked", "true")
  })

  it("announces the indeterminate state through the native property", () => {
    const { rerender } = renderWithProviders(<Checkbox indeterminate label="all" />)
    expect(input().indeterminate).toBe(true)
    expect(input()).toBePartiallyChecked()
    expect(input()).not.toHaveAttribute("aria-checked")
    expect(input()).toHaveAttribute("data-indeterminate")
    rerender(<Checkbox checked label="all" />)
    expect(input().indeterminate).toBe(false)
    expect(input()).toBeChecked()
  })

  it("toggles from the keyboard", async () => {
    renderWithProviders(<MockedCheckbox />)
    await user().tab()
    expect(input()).toHaveFocus()
    await user().keyboard(" ")
    expect(input()).toBeChecked()
  })

  it("calls onChange with the next value when the label is clicked", async () => {
    const onChange = jest.fn()
    renderWithProviders(<Checkbox checked={false} label="cpu" onChange={onChange} />)
    await user().click(screen.getByText("cpu"))
    expect(onChange).toHaveBeenCalledWith(true, expect.anything())
  })

  it("renders the label on the left when asked", () => {
    renderWithProviders(<Checkbox label="cpu" labelPosition="left" />)
    expect(screen.getByTestId("checkbox")).toHaveStyleRule("flex-direction", "row-reverse")
  })
})
