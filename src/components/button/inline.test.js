import { renderWithProviders, screen } from "testUtilities"
import { DefaultTheme, DarkTheme } from "@/theme"
import { Button } from "./button"

it.each([
  ["light", 18, DefaultTheme],
  ["light", 20, DefaultTheme],
  ["dark", 18, DarkTheme],
  ["dark", 20, DarkTheme],
])("fits an inline link into a %s %spx text context", (name, lineHeight, theme) => {
  renderWithProviders(
    <span data-testid="text-context" style={{ lineHeight: `${lineHeight}px` }}>
      <Button
        flavour="link"
        appearance="inline"
        fontSize={3.25}
        fontWeight={400}
        underline
        underlineColor="border"
        underlineOffset={0.75}
        label="postgres"
      />
      <Button flavour="link" label="Existing" />
    </span>,
    { theme }
  )
  const button = screen.getByRole("button", { name: "postgres" })
  expect(screen.getByTestId("text-context")).toHaveStyle({ lineHeight: `${lineHeight}px` })
  expect(button).toHaveStyleRule("display", "inline-flex", { modifier: "&&" })
  expect(button).toHaveStyleRule("vertical-align", "baseline", { modifier: "&&" })
  expect(button).toHaveStyleRule("line-height", "inherit", { modifier: "&&" })
  expect(button).toHaveStyleRule("min-height", "0px", { modifier: "&&" })
  expect(button).toHaveStyleRule("border-width", "0", { modifier: "&&" })
  expect(button).toHaveStyleRule("padding", "0", { modifier: "&&" })
  expect(button).toHaveStyleRule("font-weight", "400", { modifier: "&&" })
  expect(button).toHaveStyleRule("text-decoration-color", theme.colors.border, { modifier: "&&" })
  expect(button).toHaveStyleRule("text-underline-offset", "3px", { modifier: "&&" })
  expect(button).toHaveStyleRule("text-decoration-color", "currentColor", { modifier: "&&:hover" })
  expect(button).toHaveStyleRule("outline", `2px solid ${theme.colors.primary}`, {
    modifier: "&&:focus-visible",
  })
  expect(button).toHaveStyleRule("outline-color", theme.colors.segmentedFocus, {
    modifier: "&&:focus-visible",
  })
  expect(button).toHaveStyleRule("outline-offset", "-2px", { modifier: "&&:focus-visible" })
  const existing = screen.getByRole("button", { name: "Existing" })
  expect(existing).toHaveStyleRule("display", "flex", { modifier: "&&" })
  expect(existing).toHaveStyleRule("min-height", "30px", { modifier: "&&" })
  expect(existing).toHaveStyleRule("border-width", "1px", { modifier: "&&" })
  expect(existing).toHaveStyleRule("line-height", "16px", { modifier: "&&" })
})

it.each(["start", "end"])("inherits %s alignment for a wrapping inline label", textAlign => {
  const label = "A long configuration setting needs a value before its changes can be saved"
  renderWithProviders(
    <div data-testid="text-context" style={{ textAlign }}>
      <Button flavour="link" appearance="inline" width="180px" wrapChildren={false}>
        <span style={{ whiteSpace: "normal", width: "180px" }}>{label}</span>
      </Button>
      <Button label="Standard" />
    </div>
  )
  const button = screen.getByRole("button", { name: label })
  expect(screen.getByTestId("text-context")).toHaveStyle({ textAlign })
  expect(screen.getByText(label)).toHaveStyle({ whiteSpace: "normal", width: "180px" })
  expect(button).toHaveStyleRule("text-align", "inherit", { modifier: "&&" })
  expect(screen.getByRole("button", { name: "Standard" })).toHaveStyle({ textAlign: "center" })
})

it("uses the theme monospace face and preserves explicit inline geometry and string offsets", () => {
  renderWithProviders(
    <Button
      flavour="link"
      appearance="inline"
      monospace
      height={7}
      padding={[1, 3]}
      underline
      underlineOffset="0.2em"
      label="collector"
    />,
    {
      theme: {
        ...DefaultTheme,
        constants: { ...DefaultTheme.constants, FONT_MONOSPACE: "monospace" },
      },
    }
  )
  const button = screen.getByRole("button", { name: "collector" })
  expect(button).toHaveStyleRule("font-family", "monospace", { modifier: "&&" })
  expect(button).toHaveStyleRule("height", "28px", { modifier: "&&" })
  expect(button).toHaveStyleRule("min-height", "28px", { modifier: "&&" })
  expect(button).toHaveStyleRule("padding", "4px 12px", { modifier: "&&" })
  expect(button).toHaveStyleRule("text-underline-offset", "0.2em", { modifier: "&&" })
})

it("ignores inline appearance for other button flavours", () => {
  renderWithProviders(<Button flavour="hollow" appearance="inline" label="Filter" />)
  const button = screen.getByRole("button")
  expect(button).toHaveStyleRule("display", "flex", { modifier: "&&" })
  expect(button).toHaveStyleRule("min-height", "30px", { modifier: "&&" })
  expect(button).toHaveStyleRule("border-width", "1px", { modifier: "&&" })
  expect(button).toHaveStyle({ textAlign: "center" })
})
