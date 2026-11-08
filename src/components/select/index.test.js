import React from "react"
import { renderWithProviders, screen, user, within } from "testUtilities"
import { DefaultTheme } from "@/theme/default"
import { DarkTheme } from "@/theme/dark"
import Select from "."

const rgb = hex => {
  const n = parseInt(hex.slice(1), 16)
  return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`
}

const options = [
  { label: "One", value: "one" },
  { label: "Two", value: "two" },
  { label: "Three", value: "three" },
  { label: "Four", value: "four", isDisabled: true },
]

const setup = (props = {}, { theme = DefaultTheme } = {}) =>
  renderWithProviders(
    <Select options={options} data-testid="sel" aria-label="sel" classNamePrefix="rs" {...props} />,
    {
      theme,
    }
  )

const byClass = name => [...document.querySelectorAll(`.rs__${name}`)]

const openMenu = async () => {
  const u = user()
  await u.click(screen.getByRole("combobox"))
  return u
}

const style = el => getComputedStyle(el)

describe("Select", () => {
  describe("control", () => {
    // Round 6 D1: the Select control joins the 30px ladder with 13px text.
    it("is 30px tall with a 4px radius", () => {
      setup()
      const control = screen.getByTestId("selControl")
      expect(style(control).minHeight).toBe("30px")
      expect(style(control).borderRadius).toBe("4px")
    })

    it.each([
      ["light", DefaultTheme],
      ["dark", DarkTheme],
    ])("uses the field surface and a hairline border at rest (%s)", (_, theme) => {
      setup({}, { theme })
      const control = screen.getByTestId("selControl")
      expect(style(control).borderColor).toBe(rgb(theme.colors.controlBorder))
      expect(style(control).backgroundColor).toBe(rgb(theme.colors.controlBackground))
    })

    it("uses the interactive field fill and primary border when focused", async () => {
      setup()
      await user().click(screen.getByRole("combobox"))
      const control = screen.getByTestId("selControl")
      expect(style(control).borderColor).toBe(rgb(DefaultTheme.colors.primary))
      expect(style(control).backgroundColor).toBe(rgb(DefaultTheme.colors.controlHoverBackground))
      expect(style(control).boxShadow).toBe(`inset 0 0 0 1px ${DefaultTheme.colors.primary}`)
    })

    it("inherits the body font in the search input", () => {
      setup()
      // jsdom applies the cascade but does not resolve inheritance, so the winning value is "inherit".
      expect(style(screen.getByRole("combobox")).fontFamily).toBe("inherit")
    })

    it("insets text by 12px like TextInput", () => {
      setup()
      expect(style(byClass("value-container")[0]).padding).toBe("0px 12px")
    })

    it("fits the value and indicators in the 28px inner box", () => {
      setup()
      expect(style(byClass("value-container")[0]).minHeight).toBe("28px")
      expect(style(byClass("indicators")[0]).minHeight).toBe("28px")
    })

    it("uses 13px text for the value, placeholder and search input", () => {
      setup({ defaultValue: options[0] })
      expect(style(byClass("single-value")[0]).fontSize).toBe("13px")
      expect(style(screen.getByRole("combobox").parentElement).fontSize).toBe("13px")
    })

    it("uses 13px placeholder text", () => {
      setup({ placeholder: "Pick one" })
      expect(style(byClass("placeholder")[0]).fontSize).toBe("13px")
    })

    it("fades to 0.4 opacity when disabled", () => {
      setup({ isDisabled: true })
      expect(style(screen.getByTestId("selControl")).opacity).toBe("0.4")
    })

    it("draws a 16px chevron in the muted text color", () => {
      setup()
      const indicator = screen.getByTestId("selDropdownIndicator")
      expect(style(indicator).color).toBe(rgb(DefaultTheme.colors.textLite))
      expect(style(indicator.querySelector("svg")).width).toBe("16px")
    })
  })

  describe("menu", () => {
    it("sits on the dropdown surface with a 12px radius and border", async () => {
      setup()
      await openMenu()
      const menu = screen.getByTestId("selMenu")
      expect(style(menu).backgroundColor).toBe(rgb(DefaultTheme.colors.dropdown))
      expect(style(menu).borderRadius).toBe("12px")
      expect(style(menu).border).toBe(`1px solid ${rgb(DefaultTheme.colors.border)}`)
    })

    it("uses the dark dropdown surface in dark mode", async () => {
      setup({}, { theme: DarkTheme })
      await openMenu()
      expect(style(screen.getByTestId("selMenu")).backgroundColor).toBe(
        rgb(DarkTheme.colors.dropdown)
      )
    })

    it("highlights the keyboard-focused option", async () => {
      setup()
      const u = await openMenu()
      await u.keyboard("{ArrowDown}")
      const focused = document.querySelector(".rs__option--is-focused")
      expect(focused).not.toBeNull()
      expect(style(focused).backgroundColor).toBe(rgb(DefaultTheme.colors.menuItemHover))
      screen
        .getAllByTestId("selOption")
        .filter(el => el !== focused)
        .forEach(el =>
          expect(style(el).backgroundColor).not.toBe(rgb(DefaultTheme.colors.menuItemHover))
        )
    })

    it("marks the selected option with the menu tint and a green rail", async () => {
      setup({ defaultValue: options[1] })
      const u = await openMenu()
      const selected = () => screen.getAllByTestId("selOption").find(el => el.textContent === "Two")
      // react-select focuses the selected option when the menu opens.
      expect(style(selected()).backgroundColor).toBe(rgb(DefaultTheme.colors.menuItemSelectedHover))
      await u.keyboard("{ArrowDown}")
      expect(style(selected()).backgroundColor).toBe(rgb(DefaultTheme.colors.menuItemSelected))
      expect(style(selected()).boxShadow).toBe(`inset 3px 0 0 ${DefaultTheme.colors.primary}`)
      expect(style(selected()).fontWeight).toBe("500")
      expect(style(selected()).color).toBe(rgb(DefaultTheme.colors.menuItemSelectedText))
    })

    it("floats on the shared two-layer menu shadow", async () => {
      setup()
      await openMenu()
      const shadow = DefaultTheme.colors.dropdownShadow
      // jsdom drops the space between shadow layers when it serialises the value.
      const compact = value => value.replace(/,\s*/g, ",")
      expect(compact(style(screen.getByTestId("selMenu")).boxShadow)).toBe(
        compact(`0 4px 12px ${shadow}, 0 1px 2px ${shadow}`)
      )
    })

    it("keeps the 4px menu gap and aligns 13px options with the 10px field inset", async () => {
      setup()
      await openMenu()
      expect(style(screen.getByTestId("selMenu")).marginTop).toBe("4px")
      const [option] = screen.getAllByTestId("selOption")
      expect(style(option).padding).toBe("8px 10px")
      expect(style(option).borderRadius).toBe("7px")
      expect(style(option).minHeight).toBe("34px")
      expect(style(option).fontSize).toBe("13px")
    })

    it("greys out disabled options", async () => {
      setup()
      await openMenu()
      const disabled = screen.getAllByTestId("selOption").find(el => el.textContent === "Four")
      expect(style(disabled).color).toBe(rgb(DefaultTheme.colors.placeholder))
      // The darker placeholder alone would read as enabled, so disabled options also fade.
      expect(style(disabled).opacity).toBe("0.4")
      expect(disabled).toHaveAttribute("aria-disabled", "true")
    })

    it("selects an option on click and calls onChange", async () => {
      const onChange = jest.fn()
      setup({ onChange })
      const u = await openMenu()
      await u.click(screen.getByText("Three"))
      expect(onChange).toHaveBeenCalledWith(
        options[2],
        expect.objectContaining({ action: "select-option" })
      )
      expect(byClass("single-value")[0]).toHaveTextContent("Three")
    })
  })

  describe("multi value chips", () => {
    const multi = { isMulti: true, defaultValue: [options[0], options[1]] }

    it("render on a raised surface one step above the control", () => {
      setup(multi, { theme: DarkTheme })
      const [chip] = byClass("multi-value")
      expect(style(chip).backgroundColor).toBe(rgb(DarkTheme.colors.selected))
      expect(style(chip).borderRadius).toBe("2px")
    })

    it("use 12px labels with theme text color", () => {
      setup(multi)
      const [label] = byClass("multi-value__label")
      expect(style(label).fontSize).toBe("12px")
      expect(style(label).color).toBe(rgb(DefaultTheme.colors.text))
    })

    it("keep their 2px gap, a 20px height and 2px by 6px label padding", () => {
      setup(multi)
      const [chip] = byClass("multi-value")
      const [label] = byClass("multi-value__label")
      const [remove] = byClass("multi-value__remove")
      expect(style(chip).margin).toBe("2px")
      expect(style(chip).minHeight).toBe("20px")
      expect(style(label).paddingTop).toBe("2px")
      expect(style(label).paddingRight).toBe("6px")
      expect(style(label).paddingLeft).toBe("2px")
      expect(style(remove).paddingLeft).toBe("4px")
      expect(style(remove).paddingRight).toBe("4px")
    })

    it("give the remove control a muted themed color", () => {
      setup(multi)
      const [remove] = byClass("multi-value__remove")
      expect(style(remove).color).toBe(rgb(DefaultTheme.colors.textLite))
    })

    it("keep the remove control on the left of the label", () => {
      setup(multi)
      const [chip] = byClass("multi-value")
      expect(style(chip).flexDirection).toBe("row-reverse")
    })

    it("remove a value when its remove control is clicked", async () => {
      const onChange = jest.fn()
      setup({ ...multi, onChange })
      const [remove] = byClass("multi-value__remove")
      await user().click(remove)
      expect(onChange).toHaveBeenCalledWith(
        [options[1]],
        expect.objectContaining({ action: "remove-value" })
      )
    })
  })

  describe("contract", () => {
    it("lets consumer styles override internal ones", () => {
      setup({ styles: { control: base => ({ ...base, borderRadius: "10px" }) } })
      expect(style(screen.getByTestId("selControl")).borderRadius).toBe("10px")
    })

    it("respects a consumer minWidth", () => {
      setup({ styles: { minWidth: 240 } })
      expect(style(screen.getByTestId("selControl")).minWidth).toBe("240px")
    })

    it("renders a Creatable when isCreatable is set", async () => {
      setup({ isCreatable: true })
      const u = await openMenu()
      await u.keyboard("Five")
      expect(screen.getByText('Create "Five"')).toBeInTheDocument()
    })

    it("renders option icons", async () => {
      setup({ options: [{ label: "Nodes", value: "n", icon: "nodes" }] })
      await openMenu()
      expect(screen.getByTestId("selOption")).toHaveTextContent("Nodes")
      expect(within(screen.getByTestId("selOption")).getByText("Nodes").tagName).toBe("SPAN")
    })
  })
})

it("keeps a far-away keyboard option mounted as the active descendant", async () => {
  setup({
    options: Array.from({ length: 100 }, (_, index) => ({
      label: `Option ${index + 1}`,
      value: index + 1,
    })),
    estimatedOptionHeight: 28,
  })
  const keyboard = await openMenu()
  await keyboard.keyboard("{End}")

  const input = screen.getByRole("combobox")
  const active = screen.getByRole("option", { name: "Option 100" })
  expect(input).toHaveAttribute("aria-activedescendant", active.id)
  await keyboard.keyboard("{Enter}")
  expect(screen.getByText("Option 100")).toBeInTheDocument()
})

it("keeps the active option mounted when it belongs to a distant group", async () => {
  setup({
    options: Array.from({ length: 100 }, (_, index) => ({
      label: `Group ${index + 1}`,
      options: [{ label: `Grouped option ${index + 1}`, value: index + 1 }],
    })),
  })
  const keyboard = await openMenu()
  await keyboard.keyboard("{End}")

  const active = screen.getByRole("option", { name: "Grouped option 100" })
  expect(screen.getByRole("combobox")).toHaveAttribute("aria-activedescendant", active.id)
})
