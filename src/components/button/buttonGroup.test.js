/**
 * @jest-environment jsdom
 */
import React from "react"
import { renderWithProviders, user, screen } from "testUtilities"
import { ButtonGroup } from "./buttonGroup"
import { Button } from "./button"
import { DefaultTheme } from "@/theme/default"

describe("ButtonGroup", () => {
  describe("rendering", () => {
    it("renders with children buttons", () => {
      const { container } = renderWithProviders(
        <ButtonGroup>
          <Button label="First" />
          <Button label="Second" />
          <Button label="Third" />
        </ButtonGroup>
      )

      expect(screen.getByText("First")).toBeInTheDocument()
      expect(screen.getByText("Second")).toBeInTheDocument()
      expect(screen.getByText("Third")).toBeInTheDocument()
      expect(container.firstChild).toBeInTheDocument()
    })

    it("renders with items array", () => {
      const items = [
        { label: "Option 1", value: "opt1" },
        { label: "Option 2", value: "opt2" },
        { label: "Option 3", value: "opt3" },
      ]

      renderWithProviders(<ButtonGroup items={items} value="opt1" onChange={() => {}} />)

      expect(screen.getByText("Option 1")).toBeInTheDocument()
      expect(screen.getByText("Option 2")).toBeInTheDocument()
      expect(screen.getByText("Option 3")).toBeInTheDocument()
    })

    it("renders empty when no children or items", () => {
      const { container } = renderWithProviders(<ButtonGroup />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe("button group positioning", () => {
    it("applies groupFirst prop to first button", () => {
      renderWithProviders(
        <ButtonGroup>
          <Button label="First" data-testid="first-btn" />
          <Button label="Second" />
        </ButtonGroup>
      )

      const firstButton = screen.getByTestId("first-btn")
      expect(firstButton).toBeInTheDocument()
    })

    it("applies groupLast prop to last button", () => {
      renderWithProviders(
        <ButtonGroup>
          <Button label="First" />
          <Button label="Last" data-testid="last-btn" />
        </ButtonGroup>
      )

      const lastButton = screen.getByTestId("last-btn")
      expect(lastButton).toBeInTheDocument()
    })

    it("applies groupMiddle prop to middle buttons", () => {
      renderWithProviders(
        <ButtonGroup>
          <Button label="First" />
          <Button label="Middle" data-testid="middle-btn" />
          <Button label="Last" />
        </ButtonGroup>
      )

      const middleButton = screen.getByTestId("middle-btn")
      expect(middleButton).toBeInTheDocument()
    })
  })

  describe("radio button functionality", () => {
    it("handles selection changes", async () => {
      const handleChange = jest.fn()
      const items = [
        { label: "Option 1", value: "opt1" },
        { label: "Option 2", value: "opt2" },
      ]

      renderWithProviders(<ButtonGroup items={items} value="opt1" onChange={handleChange} />)

      await user().click(screen.getByText("Option 2"))
      expect(handleChange).toHaveBeenCalledWith("opt2")
    })

    it("applies hollow style to unchecked buttons", () => {
      const items = [
        { label: "Checked", value: "checked" },
        { label: "Unchecked", value: "unchecked" },
      ]

      const { container } = renderWithProviders(
        <ButtonGroup items={items} value="checked" onChange={() => {}} />
      )

      const buttons = container.querySelectorAll("button")
      expect(buttons).toHaveLength(2)
    })

    it("applies button props to all buttons", () => {
      const items = [
        { label: "Button 1", value: "btn1" },
        { label: "Button 2", value: "btn2" },
      ]

      renderWithProviders(
        <ButtonGroup
          items={items}
          value="btn1"
          onChange={() => {}}
          buttonProps={{ disabled: true }}
        />
      )

      const buttons = screen.getAllByRole("button")
      buttons.forEach(button => {
        expect(button).toBeDisabled()
      })
    })

    it("renders button titles when provided", () => {
      const items = [
        { label: "Save", value: "save", title: "Save the document" },
        { label: "Cancel", value: "cancel" },
      ]

      renderWithProviders(<ButtonGroup items={items} value="save" onChange={() => {}} />)

      expect(screen.getByTitle("Save the document")).toBeInTheDocument()
    })
  })

  describe("flex container props", () => {
    it("applies custom flex props", () => {
      const { container } = renderWithProviders(
        <ButtonGroup justifyContent="space-between" gap={2}>
          <Button label="Left" />
          <Button label="Right" />
        </ButtonGroup>
      )

      expect(container.firstChild).toBeInTheDocument()
    })

    it("always applies alignItems center", () => {
      const { container } = renderWithProviders(
        <ButtonGroup>
          <Button label="Test" />
        </ButtonGroup>
      )

      expect(container.firstChild).toHaveStyleRule("align-items", "center")
    })
  })

  describe("edge cases", () => {
    it("handles single button", () => {
      renderWithProviders(
        <ButtonGroup>
          <Button label="Only" data-testid="only-btn" />
        </ButtonGroup>
      )

      const button = screen.getByTestId("only-btn")
      expect(button).toBeInTheDocument()
    })

    it("handles non-button children", () => {
      renderWithProviders(
        <ButtonGroup>
          <div>Not a button</div>
          <Button label="Real button" />
        </ButtonGroup>
      )

      expect(screen.getByText("Not a button")).toBeInTheDocument()
      expect(screen.getByText("Real button")).toBeInTheDocument()
    })

    it("handles empty items array", () => {
      const { container } = renderWithProviders(
        <ButtonGroup items={[]} value={null} onChange={() => {}} />
      )

      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe("segmented look", () => {
    const items = [
      { label: "1h", value: "1h" },
      { label: "6h", value: "6h" },
      { label: "24h", value: "24h" },
    ]

    it("collapses the borders between segments into one hairline", () => {
      renderWithProviders(<ButtonGroup items={items} value="1h" />)
      const [first, middle, last] = screen.getAllByRole("button")
      expect(first).not.toHaveStyleRule("margin-left", "-1px", { modifier: "&&" })
      expect(middle).toHaveStyleRule("margin-left", "-1px", { modifier: "&&" })
      expect(last).toHaveStyleRule("margin-left", "-1px", { modifier: "&&" })
    })

    it("rounds only the outer corners with the 4px control radius", () => {
      renderWithProviders(<ButtonGroup items={items} value="1h" />)
      const [first, middle, last] = screen.getAllByRole("button")
      expect(first).toHaveStyleRule("border-top-left-radius", "4px", { modifier: "&&" })
      expect(middle).not.toHaveStyleRule("border-radius", expect.anything(), { modifier: "&&" })
      expect(last).toHaveStyleRule("border-bottom-right-radius", "4px", { modifier: "&&" })
    })

    it("fully rounds a group with a single segment", () => {
      renderWithProviders(<ButtonGroup items={[items[0]]} value="1h" />)
      expect(screen.getByRole("button")).toHaveStyleRule("border-radius", "4px", {
        modifier: "&&",
      })
    })

    it("raises the selected, hovered and focused segment above its neighbours", () => {
      renderWithProviders(<ButtonGroup items={items} value="6h" />)
      const [first, selected] = screen.getAllByRole("button")
      expect(selected).toHaveStyleRule("z-index", "1", { modifier: "&&" })
      expect(first).not.toHaveStyleRule("z-index", "1", { modifier: "&&" })
      expect(first).toHaveStyleRule("z-index", "2", { modifier: "&&:focus-visible" })
    })

    it("keeps unselected segments neutral so only the selection is green", () => {
      renderWithProviders(<ButtonGroup items={items} value="1h" />)
      const [selected, unselected] = screen.getAllByRole("button")
      expect(selected).toHaveStyleRule("background-color", DefaultTheme.colors.primary, {
        modifier: "&&",
      })
      expect(unselected).toHaveStyleRule("border-color", "#C0CACA", { modifier: "&&" })
      expect(unselected).toHaveStyleRule("color", "#526161", { modifier: "&&" })
      expect(unselected).toHaveStyleRule("background-color", "#DBE1E1", { modifier: "&&:hover" })
    })

    it("keeps hollow children green in children mode", () => {
      renderWithProviders(
        <ButtonGroup>
          <Button label="Edit" flavour="hollow" />
          <Button label="Copy" flavour="hollow" />
        </ButtonGroup>
      )
      screen
        .getAllByRole("button")
        .forEach(button =>
          expect(button).toHaveStyleRule("border-color", DefaultTheme.colors.primary, {
            modifier: "&&",
          })
        )
    })

    it("keeps unselected segments coloured when buttonProps ask for a status colour", () => {
      renderWithProviders(<ButtonGroup items={items} value="1h" buttonProps={{ danger: true }} />)
      const [, unselected] = screen.getAllByRole("button")
      expect(unselected).toHaveStyleRule("border-color", "#DB162F", { modifier: "&&" })
    })

    it("leaves a standalone hollow button green", () => {
      renderWithProviders(<Button label="Alone" flavour="hollow" />)
      expect(screen.getByRole("button")).toHaveStyleRule(
        "border-color",
        DefaultTheme.colors.primary,
        {
          modifier: "&&",
        }
      )
    })
  })

  describe("multi select", () => {
    it("adds and removes values", async () => {
      const items = [
        { label: "CPU", value: "cpu" },
        { label: "Mem", value: "mem" },
      ]
      const onChange = jest.fn()
      const { rerender } = renderWithProviders(
        <ButtonGroup items={items} value={["cpu"]} isMulti onChange={onChange} />
      )
      await user().click(screen.getByText("Mem"))
      expect(onChange).toHaveBeenLastCalledWith(["cpu", "mem"])

      rerender(<ButtonGroup items={items} value={["cpu", "mem"]} isMulti onChange={onChange} />)
      await user().click(screen.getByText("CPU"))
      expect(onChange).toHaveBeenLastCalledWith(["mem"])
    })

    it("starts a new selection when the value is not an array", async () => {
      const onChange = jest.fn()
      renderWithProviders(
        <ButtonGroup
          items={[{ label: "CPU", value: "cpu" }]}
          value={null}
          isMulti
          onChange={onChange}
        />
      )
      await user().click(screen.getByText("CPU"))
      expect(onChange).toHaveBeenCalledWith(["cpu"])
    })
  })

  // Round 6 D3: the contained-tabs track as an opt-in look for value pickers.
  describe('variant="segmented"', () => {
    const items = [
      { label: "1h", value: "1h" },
      { label: "6h", value: "6h" },
      { label: "24h", value: "24h" },
    ]

    const setup = (props = {}) =>
      renderWithProviders(
        <ButtonGroup items={items} value="6h" variant="segmented" data-testid="group" {...props} />
      )

    it("draws the shared tinted track with a 3px inset", () => {
      setup()
      const track = screen.getByTestId("group")
      expect(track).toHaveStyleRule("border", `1px solid ${DefaultTheme.colors.borderSecondary}`)
      expect(track).toHaveStyleRule("padding", "3px")
      expect(track).toHaveStyleRule("border-radius", "4px")
    })

    it("raises the selected item on the dropdown surface and marks it pressed", () => {
      setup()
      const [first, selected] = screen.getAllByRole("button")
      expect(selected).toHaveStyleRule("background", DefaultTheme.colors.dropdown)
      expect(selected).toHaveStyleRule("font-weight", "600")
      expect(selected).toHaveAttribute("aria-pressed", "true")
      expect(first).toHaveStyleRule("color", DefaultTheme.colors.textLite)
      expect(first).toHaveAttribute("aria-pressed", "false")
    })

    it("uses 22px items with 13px text and a 10px inset", () => {
      setup()
      const [item] = screen.getAllByRole("button")
      expect(item).toHaveStyleRule("height", "22px")
      expect(item).toHaveStyleRule("font-size", "13px")
      expect(item).toHaveStyleRule("padding", "0 10px")
    })

    it("does not use the default joined-button look", () => {
      setup()
      const [, middle] = screen.getAllByRole("button")
      expect(middle).not.toHaveStyleRule("margin-left", "-1px", { modifier: "&&" })
    })

    it("selects a value on click", async () => {
      const onChange = jest.fn()
      setup({ onChange })
      await user().click(screen.getByRole("button", { name: "24h" }))
      expect(onChange).toHaveBeenCalledWith("24h")
    })

    it("toggles values when isMulti", async () => {
      const onChange = jest.fn()
      setup({ isMulti: true, value: ["1h"], onChange })
      expect(screen.getByRole("button", { name: "1h" })).toHaveAttribute("aria-pressed", "true")
      await user().click(screen.getByRole("button", { name: "6h" }))
      expect(onChange).toHaveBeenCalledWith(["1h", "6h"])
    })

    it("keeps item titles and per-item button props", () => {
      setup({ items: [{ ...items[0], title: "Last hour", buttonProps: { disabled: true } }] })
      const item = screen.getByRole("button", { name: "1h" })
      expect(item).toHaveAttribute("title", "Last hour")
      expect(item).toBeDisabled()
    })
  })
})
