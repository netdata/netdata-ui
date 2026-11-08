/**
 * @jest-environment jsdom
 */
import React from "react"
import { renderWithProviders, user, screen } from "testUtilities"
import { ButtonGroup } from "./buttonGroup"
import { Button } from "./button"
import { DefaultTheme } from "@/theme/default"
import { DarkTheme } from "@/theme/dark"

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
      expect(unselected).toHaveStyleRule("border-color", DefaultTheme.colors.buttonNeutralBorder, {
        modifier: "&&",
      })
      expect(unselected).toHaveStyleRule("color", DefaultTheme.colors.text, { modifier: "&&" })
      expect(unselected).toHaveStyleRule(
        "background-color",
        DefaultTheme.colors.buttonNeutralHollowHover,
        { modifier: "&&:hover" }
      )
    })

    it("keeps hollow children green in children mode", () => {
      renderWithProviders(
        <ButtonGroup>
          <Button label="Edit" flavour="hollow" />
          <Button label="Copy" flavour="hollow" />
        </ButtonGroup>
      )
      screen.getAllByRole("button").forEach(button =>
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
      expect(track).toHaveStyleRule("border", `1px solid ${DefaultTheme.colors.segmentedBorder}`)
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

    it.each([
      ["default", undefined, { "aria-disabled": true }],
      ["raised", "raised", { "aria-disabled": "true" }],
    ])(
      "keeps an aria-disabled %s item focusable without changing its value",
      async (_appearanceName, appearance, itemButtonProps) => {
        const onChange = jest.fn()
        const u = user()
        renderWithProviders(
          <ButtonGroup
            variant="segmented"
            appearance={appearance}
            items={[
              { label: "Locked", value: "locked", buttonProps: itemButtonProps },
              { label: "Available", value: "available" },
            ]}
            value="available"
            onChange={onChange}
          />
        )

        const locked = screen.getByRole("button", { name: "Locked" })
        await u.tab()
        expect(locked).toHaveFocus()
        await u.keyboard("{Enter}")
        await u.keyboard(" ")
        await u.click(locked)
        expect(onChange).not.toHaveBeenCalled()

        await u.click(screen.getByRole("button", { name: "Available" }))
        expect(onChange).toHaveBeenCalledWith("available")
      }
    )

    it("keeps a supplied item click handler ahead of the generated aria-disabled handler", async () => {
      const onChange = jest.fn()
      const onClick = jest.fn()
      renderWithProviders(
        <ButtonGroup
          variant="segmented"
          items={[
            {
              label: "Locked",
              value: "locked",
              buttonProps: { "aria-disabled": true, onClick },
            },
          ]}
          value="locked"
          onChange={onChange}
        />
      )

      await user().click(screen.getByRole("button", { name: "Locked" }))
      expect(onClick).toHaveBeenCalledTimes(1)
      expect(onChange).not.toHaveBeenCalled()
    })

    it.each([false, "false"])(
      "allows aria-disabled=%p when an item overrides a disabled group",
      async ariaDisabled => {
        const onChange = jest.fn()
        renderWithProviders(
          <ButtonGroup
            variant="segmented"
            appearance="raised"
            items={[
              {
                label: "Available",
                value: "available",
                buttonProps: { "aria-disabled": ariaDisabled },
              },
            ]}
            value="available"
            buttonProps={{ "aria-disabled": true }}
            onChange={onChange}
          />
        )

        await user().click(screen.getByRole("button", { name: "Available" }))
        expect(onChange).toHaveBeenCalledWith("available")
      }
    )

    it.each([[undefined], ["raised"]])(
      "keeps a natively disabled %s item disabled and out of the tab order",
      async appearance => {
        const onChange = jest.fn()
        renderWithProviders(
          <ButtonGroup
            variant="segmented"
            appearance={appearance}
            items={[{ label: "Disabled", value: "disabled" }]}
            value="disabled"
            buttonProps={{ disabled: true }}
            onChange={onChange}
          />
        )

        const disabled = screen.getByRole("button", { name: "Disabled" })
        expect(disabled).toBeDisabled()
        await user().tab()
        expect(disabled).not.toHaveFocus()
        await user().click(disabled)
        expect(onChange).not.toHaveBeenCalled()
        expect(disabled).toHaveStyleRule("opacity", "0.4", { modifier: ":disabled" })
      }
    )

    it("styles raised aria-disabled items without replacing a supplied enabled opacity", () => {
      const { rerender } = renderWithProviders(
        <ButtonGroup
          variant="segmented"
          appearance="raised"
          items={[{ label: "Locked", value: "locked", buttonProps: { "aria-disabled": "true" } }]}
          value="locked"
        />
      )

      const locked = screen.getByRole("button", { name: "Locked" })
      expect(locked).toHaveStyleRule("opacity", "0.5")
      expect(locked).toHaveStyleRule("cursor", "not-allowed")

      rerender(
        <ButtonGroup
          variant="segmented"
          appearance="raised"
          items={[{ label: "Available", value: "available" }]}
          value="available"
          buttonProps={{ opacity: 0.75 }}
        />
      )
      expect(screen.getByRole("button", { name: "Available" })).toHaveStyleRule("opacity", "0.75")
    })
  })

  describe('segmented appearance="raised"', () => {
    const items = [
      { label: <span>All nodes</span>, value: false },
      { label: <span>Nodes with data</span>, value: true },
    ]

    const setup = (theme, props = {}) =>
      renderWithProviders(
        <ButtonGroup
          variant="segmented"
          appearance="raised"
          items={items}
          value={false}
          aria-label="Node layout"
          {...props}
        />,
        { theme }
      )

    describe.each([
      [
        "light",
        DefaultTheme,
        "#F0F3F0",
        "#E0E7E2",
        "0 0 0 1px #D3DBD5,0 1px 2px rgba(23, 32, 32, 0.14)",
        "#007830",
      ],
      ["dark", DarkTheme, "#29312C", "rgba(255,255,255,0.11)", "none", "#00CD51"],
    ])("%s theme", (_name, theme, background, selectedBackground, shadow, focus) => {
      it.each([
        [true, "2px", "6px", "22px", "12px", "0 8px", "4px"],
        [false, "3px", "8px", "26px", "13px", "0 10px", "6px"],
      ])(
        "uses the approved geometry with compact=%s",
        (compact, inset, radius, height, fontSize, padding, itemRadius) => {
          setup(theme, { compact })
          const track = screen.getByRole("group", { name: "Node layout" })
          expect(track).toHaveStyleRule("padding", inset)
          expect(track).toHaveStyleRule("gap", "2px")
          expect(track).toHaveStyleRule("border-radius", radius)
          expect(track).toHaveStyleRule("flex", "0 0 auto")
          expect(track).toHaveStyleRule("border", `1px solid ${theme.colors.segmentedBorder}`)
          expect(track).toHaveStyleRule("background-color", background)
          screen.getAllByRole("button").forEach(button => {
            expect(button).toHaveStyleRule("height", height)
            expect(button).toHaveStyleRule("font-size", fontSize)
            expect(button).toHaveStyleRule("padding", padding)
            expect(button).toHaveStyleRule("border-radius", itemRadius)
            expect(button).toHaveStyleRule("appearance", "none")
            expect(button).toHaveStyleRule("text-align", "inherit")
            expect(button).toHaveStyleRule("font-family", "inherit")
            expect(button).toHaveStyleRule("line-height", "inherit")
            expect(button).toHaveStyleRule("justify-content", "start")
          })
        }
      )

      it("distinguishes selected, idle, hovered and focused items", () => {
        setup(theme, { compact: true })
        const [selected, idle] = screen.getAllByRole("button")
        expect(selected).toHaveStyleRule("background-color", selectedBackground)
        expect(selected).toHaveStyleRule("box-shadow", shadow)
        expect(selected).toHaveStyleRule("font-weight", "600")
        expect(selected).toHaveStyleRule("color", theme.colors.textFocus)
        expect(idle).toHaveStyleRule("color", theme.colors.statusMutedText)
        expect(idle).toHaveStyleRule("font-weight", "500")
        expect(idle).toHaveStyleRule("box-shadow", "none")
        expect(idle).toHaveStyleRule("transition", "color 120ms ease,background 120ms ease")
        expect(idle).toHaveStyleRule("color", theme.colors.textFocus, { modifier: ":hover" })
        expect(idle).toHaveStyleRule("outline", `2px solid ${theme.colors.primary}`, {
          modifier: ":focus-visible",
        })
        expect(idle).toHaveStyleRule("outline-color", focus, { modifier: ":focus-visible" })
        expect(idle).toHaveStyleRule("outline-offset", "-2px", { modifier: ":focus-visible" })
      })

      it("resolves the selected shadow from the theme shadows namespace", () => {
        setup({ ...theme, shadows: { segmentedSelected: "inset 0 0 0 1px currentColor" } })
        expect(screen.getAllByRole("button")[0]).toHaveStyleRule(
          "box-shadow",
          "inset 0 0 0 1px currentColor"
        )
      })

      it("lets a raised item override its height without changing the normal font size", () => {
        setup(theme, {
          items: [
            { label: "Default", value: false },
            { label: "Compact height", value: true, buttonProps: { height: 5.5 } },
          ],
        })

        const [, compactHeight] = screen.getAllByRole("button")
        expect(compactHeight).toHaveStyleRule("height", "22px")
        expect(compactHeight).toHaveStyleRule("font-size", "13px")
      })

      it("uses the shared monospace fallback and honors a theme override", () => {
        const monospaceItems = [
          { label: "Monospace", value: false, buttonProps: { monospace: true } },
        ]
        setup(theme, { items: monospaceItems })
        expect(screen.getByRole("button")).toHaveStyleRule(
          "font-family",
          "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace"
        )

        renderWithProviders(
          <ButtonGroup
            variant="segmented"
            appearance="raised"
            items={monospaceItems}
            value={false}
            aria-label="Node layout"
          />,
          {
            theme: {
              ...theme,
              constants: { ...theme.constants, FONT_MONOSPACE: "Custom Mono" },
            },
          }
        )
        expect(screen.getAllByRole("button")[1]).toHaveStyleRule("font-family", "Custom Mono")
      })

      it("honors raised hover color and disabled opacity pseudo props", () => {
        setup(theme, {
          items: [
            {
              label: "Native disabled",
              value: false,
              buttonProps: { disabled: true, _disabled: { opacity: 0.5 } },
            },
            {
              label: "Aria disabled",
              value: true,
              buttonProps: { "aria-disabled": true, _disabled: { opacity: 0.5 } },
            },
            {
              label: "Muted hover",
              value: "hover",
              buttonProps: { _hover: { color: "statusMutedText" } },
            },
          ],
        })

        const [nativeDisabled, ariaDisabled, mutedHover] = screen.getAllByRole("button")
        expect(nativeDisabled).toHaveStyleRule("opacity", "0.5", { modifier: ":disabled" })
        expect(ariaDisabled).toHaveStyleRule("opacity", "0.5", {
          modifier: "[aria-disabled=true]",
        })
        expect(mutedHover).toHaveStyleRule("color", theme.colors.statusMutedText, {
          modifier: ":hover",
        })
      })

      it("keeps boolean selection and native button props with ReactNode labels", async () => {
        const onChange = jest.fn()
        const onFocus = jest.fn()
        const ref = React.createRef()
        const { rerender } = setup(theme, {
          compact: true,
          onChange,
          items: [items[0], { ...items[1], buttonProps: { ref, onFocus, title: "Filter nodes" } }],
        })
        const [all, filtered] = screen.getAllByRole("button")
        expect(all).toHaveAttribute("aria-pressed", "true")
        expect(filtered).toHaveAttribute("aria-pressed", "false")
        expect(filtered).toHaveAttribute("type", "button")
        expect(filtered).toHaveAttribute("title", "Filter nodes")
        expect(ref.current).toBe(filtered)
        await user().click(filtered)
        expect(onChange).toHaveBeenLastCalledWith(true)
        expect(onFocus).toHaveBeenCalledTimes(1)
        rerender(
          <ButtonGroup
            variant="segmented"
            appearance="raised"
            compact
            items={items}
            value={true}
            onChange={onChange}
          />
        )
        expect(screen.getByRole("button", { name: "Nodes with data" })).toHaveAttribute(
          "aria-pressed",
          "true"
        )
        await user().click(screen.getByRole("button", { name: "All nodes" }))
        expect(onChange).toHaveBeenLastCalledWith(false)
      })
    })

    it("lets supplied layout props override raised track defaults", () => {
      setup(DefaultTheme, {
        compact: true,
        padding: [2],
        gap: 2,
        round: 3,
        background: "mainBackground",
      })
      const track = screen.getByRole("group")
      expect(track).toHaveStyleRule("padding", "8px")
      expect(track).toHaveStyleRule("gap", "8px")
      expect(track).toHaveStyleRule("border-radius", "12px")
      expect(track).toHaveStyleRule("background-color", DefaultTheme.colors.mainBackground)
    })

    it("leaves the existing segmented appearance unchanged when only compact is supplied", () => {
      renderWithProviders(<ButtonGroup variant="segmented" compact items={items} value={false} />)
      expect(screen.getByRole("group")).toHaveStyleRule("padding", "3px")
      expect(screen.getByRole("group")).toHaveStyleRule("border-radius", "4px")
      expect(screen.getAllByRole("button")[0]).toHaveStyleRule("font-size", "13px")
    })
  })
})

it("preserves explicit raised item geometry and weight alongside unchanged defaults", () => {
  renderWithProviders(
    <ButtonGroup
      variant="segmented"
      appearance="raised"
      value="custom"
      items={[
        { label: "Default", value: "default" },
        {
          label: "Custom",
          value: "custom",
          buttonProps: { height: 7, padding: [1, 3], round: 1, fontWeight: 500 },
        },
      ]}
    />
  )
  const normal = screen.getByRole("button", { name: "Default" })
  expect(normal).toHaveStyleRule("height", "26px")
  expect(normal).toHaveStyleRule("padding", "0 10px")
  expect(normal).toHaveStyleRule("border-radius", "6px")
  expect(normal).toHaveStyleRule("font-weight", "500")
  const custom = screen.getByRole("button", { name: "Custom" })
  expect(custom).toHaveStyleRule("height", "28px")
  expect(custom).toHaveStyleRule("padding", "4px 12px")
  expect(custom).toHaveStyleRule("border-radius", "4px")
  expect(custom).toHaveStyleRule("font-weight", "500")
})
