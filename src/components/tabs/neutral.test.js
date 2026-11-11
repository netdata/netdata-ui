import { createRef } from "react"
import { renderWithProviders, screen, user } from "testUtilities"
import { DefaultTheme, DarkTheme } from "@/theme"
import StatusWord from "@/components/pill/statusWord"
import { Tab, Tabs } from "."

it.each([
  ["light", DefaultTheme],
  ["dark", DarkTheme],
])("preserves neutral line geometry and rich status labels in %s", (_, theme) => {
  renderWithProviders(
    <Tabs appearance="neutral">
      <Tab
        label={
          <>
            <span>Collectors</span>
            <StatusWord size="small" dot={false} color="statusMutedText">
              0
            </StatusWord>
            <StatusWord size="small" strong dot="bar" color="statusErrorText">
              2
            </StatusWord>
          </>
        }
      />
      <Tab label="Alerts" />
    </Tabs>,
    { theme }
  )
  const [selected, idle] = screen.getAllByRole("tab")
  expect(selected.tagName).toBe("BUTTON")
  expect(selected).toHaveStyle({
    display: "inline-flex",
    height: "34px",
    padding: "0 12px",
    gap: "7px",
    fontFamily: "inherit",
    fontVariantNumeric: "inherit",
    textAlign: "inherit",
    appearance: "none",
    fontSize: "13px",
    lineHeight: "20px",
    fontWeight: "600",
    borderRadius: "0",
    maxWidth: "none",
    color: theme.colors.textFocus,
  })
  expect(selected).toHaveStyleRule("border", "0")
  expect(idle).toHaveStyleRule("font-weight", "500")
  expect(idle).toHaveStyleRule("color", theme.colors.textFocus)
  expect(selected).toHaveStyleRule("box-shadow", `inset 0 -2px 0 ${theme.colors.textFocus}`)
  expect(idle).toHaveStyleRule("box-shadow", "none")
  for (const tab of [selected, idle]) {
    expect(tab).toHaveStyleRule("background", theme.colors.controlHoverBackground, {
      modifier: ":hover",
    })
    expect(tab).toHaveStyleRule("background", theme.colors.controlHoverBackground, {
      modifier: '[aria-expanded="true"]',
    })
    expect(tab).toHaveStyleRule("outline-color", theme.colors.segmentedFocus, {
      modifier: ":focus-visible",
    })
    expect(tab).toHaveStyleRule("outline-offset", "-4px", { modifier: ":focus-visible" })
    expect(tab).not.toHaveStyleRule("color", expect.any(String), { modifier: "&>span" })
  }
  expect(screen.getAllByTestId("status-word")[0]).toHaveStyle({
    color: theme.colors.statusMutedText,
  })
  expect(screen.getAllByTestId("status-word")[1]).toHaveStyle({
    color: theme.colors.statusErrorText,
  })
})

it("honors explicit neutral line dimensions and typography", () => {
  const { rerender } = renderWithProviders(
    <Tab
      appearance="neutral"
      label="Custom"
      height={9}
      width={{ max: 60 }}
      padding={[1, 4]}
      gap={2}
      round={1}
      fontSize={4}
      lineHeight="24px"
      fontWeight={400}
    />
  )
  const tab = screen.getByRole("tab")
  expect(tab).toHaveStyle({
    height: "36px",
    maxWidth: "240px",
    padding: "4px 16px",
    gap: "8px",
    borderRadius: "4px",
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: "400",
  })
  expect(screen.getByText("Custom")).toHaveStyleRule("font-size", "inherit")
  rerender(<Tab appearance="neutral" label="Custom" lineHeight={1.5} />)
  expect(screen.getByRole("tab")).toHaveStyleRule("line-height", "1.5")
})

it("retains native activation, refs, IDs and popup semantics for a neutral line trigger", async () => {
  const onClick = jest.fn()
  const ref = createRef()
  renderWithProviders(
    <Tab
      appearance="neutral"
      label="More"
      ref={ref}
      role="button"
      aria-selected={undefined}
      aria-expanded
      aria-controls="more-types"
      id="more-trigger"
      tabIndex={0}
      onClick={onClick}
    />
  )
  const trigger = screen.getByRole("button", { name: "More" })
  expect(ref.current).toBe(trigger)
  expect(trigger).not.toHaveAttribute("aria-selected")
  expect(trigger).toHaveAttribute("aria-controls", "more-types")
  expect(trigger.id).toBe("more-trigger")
  trigger.focus()
  await user().keyboard("{Enter} ")
  expect(onClick).toHaveBeenCalledTimes(2)
})

it("moves focus and selection to the first and last enabled neutral line tabs", async () => {
  renderWithProviders(
    <Tabs appearance="neutral">
      <Tab label="Unavailable start" disabled />
      <Tab label="Overview">Overview content</Tab>
      <Tab label="Nodes">Nodes content</Tab>
      <Tab label="Unavailable end" disabled />
    </Tabs>
  )
  const keyboard = user()
  const overview = screen.getByRole("tab", { name: "Overview" })
  const nodes = screen.getByRole("tab", { name: "Nodes" })

  await keyboard.tab()
  expect(overview).toHaveFocus()

  await keyboard.keyboard("{End}")
  expect(nodes).toHaveFocus()
  expect(nodes).toHaveAttribute("aria-selected", "true")
  expect(screen.getByText("Nodes content")).toBeInTheDocument()

  await keyboard.keyboard("{Home}")
  expect(overview).toHaveFocus()
  expect(overview).toHaveAttribute("aria-selected", "true")
  expect(screen.getByText("Overview content")).toBeInTheDocument()
})

it("leaves default line and contained appearances unchanged", () => {
  renderWithProviders(
    <>
      <Tab label="Default" active />
      <Tab label="Contained" variant="contained" appearance="neutral" />
    </>
  )
  const [line, contained] = screen.getAllByRole("tab")
  expect(line.tagName).toBe("DIV")
  expect(line).toHaveStyleRule("height", "32px")
  expect(line).toHaveStyleRule("font-variant-numeric", "tabular-nums")
  expect(line).toHaveStyleRule("box-shadow", `inset 0 -2px 0 ${DefaultTheme.colors.primary}`)
  expect(contained.tagName).toBe("DIV")
  expect(contained).toHaveStyleRule("height", "22px")
})
