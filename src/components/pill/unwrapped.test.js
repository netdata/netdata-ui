import { createRef } from "react"
import { renderWithProviders, screen } from "testUtilities"
import { DefaultTheme, DarkTheme } from "@/theme"
import Pill from "./index"

it("keeps editable content and its native attributes on the unwrapped root", () => {
  const ref = createRef()
  renderWithProviders(
    <Pill
      as="span"
      wrapChildren={false}
      ref={ref}
      id="reference"
      contentEditable
      suppressContentEditableWarning
      role="textbox"
      aria-label="Reference"
      aria-describedby="hint"
      data-reference="store"
    >
      <span>Secret from </span>
      {"vault · prod"}
    </Pill>
  )

  const root = screen.getByRole("textbox", { name: "Reference" })
  expect(root.tagName).toBe("SPAN")
  expect(ref.current).toBe(root)
  expect(root).toHaveAttribute("id", "reference")
  expect(root).toHaveAttribute("contenteditable", "true")
  expect(root).toHaveAttribute("aria-describedby", "hint")
  expect(root).toHaveAttribute("data-reference", "store")
  expect(root.childNodes).toHaveLength(2)
  expect(root.firstChild).toHaveTextContent("Secret from")
  expect(root.lastChild.nodeType).toBe(Node.TEXT_NODE)
  expect(root.lastChild.textContent).toBe("vault · prod")
  expect(screen.queryByTestId("pill-text")).not.toBeInTheDocument()
})

it("keeps adjacent child groups direct and allows a zero gap", () => {
  renderWithProviders(
    <Pill wrapChildren={false} gap={0}>
      <span data-testid="label">name</span>
      <span data-testid="value">value</span>
    </Pill>
  )

  const root = screen.getByTestId("pill")
  expect(screen.getByTestId("label").parentElement).toBe(root)
  expect(screen.getByTestId("value").parentElement).toBe(root)
  expect(root).toHaveStyleRule("gap", "0px")
  expect(root).toHaveStyleRule("font-variant-numeric", "inherit")
})

it.each([false, true])("preserves icon and dot order with reverse=%s", reverse => {
  renderWithProviders(
    <Pill wrapChildren={false} icon={<span data-testid="glyph" />} dot reverse={reverse}>
      <span data-testid="label">value</span>
    </Pill>
  )

  expect([...screen.getByTestId("pill").children].map(child => child.dataset.testid)).toEqual(
    reverse ? ["pill-dot", "label", "glyph"] : ["glyph", "pill-dot", "label"]
  )
})

it.each([
  ["light", DefaultTheme],
  ["dark", DarkTheme],
])("paints unwrapped text with theme ink and explicit font metrics in %s", (_, base) => {
  const theme = { ...base, constants: { ...base.constants, FONT_MONOSPACE: "Reference Mono" } }
  renderWithProviders(
    <Pill
      wrapChildren={false}
      hollow
      color="statusMutedText"
      monospace
      fontSize={2.75}
      fontWeight={500}
      lineHeight="18px"
    >
      value
    </Pill>,
    { theme }
  )

  const root = screen.getByTestId("pill")
  expect(root).toHaveStyleRule("color", base.colors.statusMutedText)
  expect(root).toHaveStyleRule("font-family", "Reference Mono")
  expect(root).toHaveStyleRule("font-size", "11px")
  expect(root).toHaveStyleRule("font-weight", "500")
  expect(root).toHaveStyleRule("line-height", "18px")
})

it("uses the tone ink when unwrapped without an explicit color", () => {
  renderWithProviders(
    <Pill wrapChildren={false} hollow flavour="warning">
      value
    </Pill>
  )

  expect(screen.getByTestId("pill")).toHaveStyleRule("color", DefaultTheme.colors.warning)
})

it("falls back to the shared monospace face and accepts CSS font metrics", () => {
  const constants = { ...DefaultTheme.constants }
  delete constants.FONT_MONOSPACE
  renderWithProviders(
    <Pill wrapChildren={false} monospace fontSize="12px" fontWeight="normal" lineHeight={1.5}>
      value
    </Pill>,
    { theme: { ...DefaultTheme, constants } }
  )

  const root = screen.getByTestId("pill")
  expect(root).toHaveStyleRule(
    "font-family",
    "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace"
  )
  expect(root).toHaveStyleRule("font-size", "12px")
  expect(root).toHaveStyleRule("font-weight", "normal")
  expect(root).toHaveStyleRule("line-height", "1.5")
})

it("uses the body text scale for wrapped content and inherits root font metrics", () => {
  renderWithProviders(<Pill>value</Pill>)

  const root = screen.getByTestId("pill")
  expect(screen.getByTestId("pill-text").parentElement).toBe(root)
  expect(screen.getByTestId("pill-text")).toHaveStyleRule("font-size", "13px")
  expect(screen.getByTestId("pill-text")).toHaveStyleRule("font-weight", "500")
  expect(root).toHaveStyleRule("color", DefaultTheme.colors.text)
  expect(root).toHaveStyleRule("font-variant-numeric", "tabular-nums")
  for (const property of ["font-family", "font-size", "font-weight", "line-height"])
    expect(root).not.toHaveStyleRule(property)
})

it("keeps normal=false strong when children are unwrapped", () => {
  renderWithProviders(
    <Pill wrapChildren={false} normal={false}>
      value
    </Pill>
  )

  expect(screen.getByTestId("pill")).toHaveStyleRule("font-weight", "600")
})

it.each([
  ["light", DefaultTheme],
  ["dark", DarkTheme],
])("keeps unwrapped semi-stale text bold for contrast in %s", (_, theme) => {
  renderWithProviders(
    <Pill wrapChildren={false} hollow semi flavour="stale">
      value
    </Pill>,
    { theme }
  )

  const root = screen.getByTestId("pill")
  expect(root).toHaveStyleRule("color", theme.colors.bright)
  expect(root).toHaveStyleRule("font-weight", "600")
})

it.each([400, "inherit"])("lets explicit weight %s override unwrapped strong text", fontWeight => {
  renderWithProviders(
    <Pill wrapChildren={false} normal={false} hollow semi flavour="stale" fontWeight={fontWeight}>
      value
    </Pill>
  )

  expect(screen.getByTestId("pill")).toHaveStyleRule("font-weight", String(fontWeight))
})
