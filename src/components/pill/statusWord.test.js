import { renderWithProviders, screen } from "testUtilities"
import { DarkTheme, DefaultTheme } from "@/theme"
import { StatusWord } from "./index"

const light = DefaultTheme.colors

describe("StatusWord", () => {
  it("does not give a decorative count mark an unrelated status", () => {
    const { container } = renderWithProviders(
      <StatusWord size="small" dot="bar" color="statusWarningText" data-tone="warning">
        1
      </StatusWord>
    )
    expect([...container.querySelectorAll("[data-tone]")].map(node => node.dataset.tone)).toEqual([
      "warning",
    ])
  })

  it("renders a filled tone dot and a 13px, 500 tone-coloured word", () => {
    renderWithProviders(<StatusWord tone="error">Critical</StatusWord>)
    const word = screen.getByTestId("status-word")
    expect(word).toHaveTextContent("Critical")
    expect(word).toHaveStyleRule("font-size", "13px")
    expect(word.tagName).toBe("SPAN")
    expect(word).toHaveStyleRule("display", "inline-flex")
    expect(word).toHaveStyleRule("align-items", "center")
    expect(word).toHaveStyleRule("gap", "6px")
    expect(word).not.toHaveStyleRule("flex")
    expect(word).toHaveStyleRule("font-weight", "500")
    expect(word).toHaveStyleRule("color", light.errorSoftText)
    expect(screen.getByTestId("status-word-dot")).toHaveStyleRule(
      "background-color",
      light.errorSoftText
    )
    expect(screen.getByTestId("status-word-dot")).toHaveAttribute("aria-hidden", "true")
  })

  it.each([
    ["center", "center"],
    ["start", "flex-start"],
  ])("supports %s alignment and fixed flex sizing", (alignItems, expectedAlignment) => {
    renderWithProviders(
      <StatusWord alignItems={alignItems} flex={false}>
        Running
      </StatusWord>
    )
    expect(screen.getByTestId("status-word")).toHaveStyleRule("align-items", expectedAlignment)
    expect(screen.getByTestId("status-word")).toHaveStyleRule("flex", "0 0 auto")
  })

  it("renders a ring dot when dot is hollow", () => {
    renderWithProviders(
      <StatusWord tone="stale" dot="hollow">
        Stale
      </StatusWord>
    )
    expect(screen.getByTestId("status-word-dot")).toHaveStyleRule(
      "border",
      `1.5px solid ${light.staleSoftText}`
    )
  })

  it("renders an optional muted detail at normal weight", () => {
    renderWithProviders(
      <StatusWord tone="success" detail="4 collectors">
        Running
      </StatusWord>
    )
    const detail = screen.getByTestId("status-word-detail")
    expect(detail).toHaveTextContent("· 4 collectors")
    expect(detail).toHaveStyleRule("color", light.textLite)
    expect(detail).toHaveStyleRule("font-weight", "400")
  })

  it("renders no detail when none is given", () => {
    renderWithProviders(<StatusWord>Idle</StatusWord>)
    expect(screen.queryByTestId("status-word-detail")).not.toBeInTheDocument()
  })

  it("renders a zero detail after the separator", () => {
    renderWithProviders(
      <StatusWord tone="error" detail={0}>
        Critical
      </StatusWord>
    )
    expect(screen.getByTestId("status-word-detail")).toHaveTextContent("· 0")
  })

  it("renders no detail for an empty string", () => {
    renderWithProviders(<StatusWord detail="">Idle</StatusWord>)
    expect(screen.queryByTestId("status-word-detail")).not.toBeInTheDocument()
  })

  it("defaults to the neutral text colour and supports muted", () => {
    const { unmount } = renderWithProviders(<StatusWord>Idle</StatusWord>)
    expect(screen.getByTestId("status-word")).toHaveStyleRule("color", light.text)
    unmount()
    renderWithProviders(<StatusWord tone="muted">Disabled</StatusWord>)
    expect(screen.getByTestId("status-word")).toHaveStyleRule("color", light.textLite)
  })

  it("accepts a custom test id", () => {
    renderWithProviders(<StatusWord data-testid="node-status">Live</StatusWord>)
    expect(screen.getByTestId("node-status")).toBeInTheDocument()
    expect(screen.getByTestId("node-status-dot")).toBeInTheDocument()
  })

  it("renders a React node detail after the separator", () => {
    renderWithProviders(
      <StatusWord tone="error" detail={<strong>3 nodes</strong>}>
        Critical
      </StatusWord>
    )
    const detail = screen.getByTestId("status-word-detail")
    expect(detail).toHaveTextContent("· 3 nodes")
    expect(detail.querySelector("strong")).toHaveTextContent("3 nodes")
  })
})

describe.each([
  ["light", DefaultTheme],
  ["dark", DarkTheme],
])("StatusWord colour in the %s theme", (name, theme) => {
  it.each(["filled", "hollow", "bar"])("applies an explicit colour to the word and %s dot", dot => {
    renderWithProviders(
      <StatusWord color="primary" dot={dot} tone="error">
        Running
      </StatusWord>,
      { theme }
    )
    expect(screen.getByTestId("status-word")).toHaveStyleRule("color", theme.colors.primary)
    expect(screen.getByTestId("status-word-dot")).toHaveStyleRule(
      dot === "hollow" ? "border" : "background-color",
      dot === "hollow" ? `1.5px solid ${theme.colors.primary}` : theme.colors.primary
    )
  })
})

describe.each([
  ["light", DefaultTheme, "statusSuccessText", "#006729", "filled"],
  ["light", DefaultTheme, "statusErrorText", "#c4122a", "hollow"],
  ["light", DefaultTheme, "statusWarningText", "#804B00", "filled"],
  ["light", DefaultTheme, "statusMutedText", "#58615B", "hollow"],
  ["dark", DarkTheme, "statusSuccessText", "#1fc463", "filled"],
  ["dark", DarkTheme, "statusErrorText", "#ff6b7a", "hollow"],
  ["dark", DarkTheme, "statusWarningText", "#f5b638", "filled"],
  ["dark", DarkTheme, "statusMutedText", "#98A69D", "hollow"],
])("StatusWord palette in the %s theme", (name, theme, color, expectedColor, dot) => {
  it(`resolves ${color} for the word and dot`, () => {
    renderWithProviders(
      <StatusWord color={color} dot={dot}>
        Status
      </StatusWord>,
      { theme }
    )
    expect(screen.getByTestId("status-word")).toHaveStyleRule("color", expectedColor)
    expect(screen.getByTestId("status-word-dot")).toHaveStyleRule(
      dot === "hollow" ? "border" : "background-color",
      dot === "hollow" ? `1.5px solid ${expectedColor}` : expectedColor
    )
  })
})

it("renders a small strong bar status with a zero count and no dot chrome", () => {
  renderWithProviders(
    <StatusWord size="small" strong dot="bar" color="statusErrorText">
      0
    </StatusWord>
  )
  const word = screen.getByTestId("status-word")
  const dot = screen.getByTestId("status-word-dot")
  expect(word).toHaveTextContent("0")
  expect(word).toHaveStyleRule("font-size", "12px")
  expect(word).toHaveStyleRule("font-weight", "600")
  expect(word).toHaveStyleRule("font-variant-numeric", "tabular-nums")
  expect(word).toHaveStyleRule("gap", "4px")
  expect(dot).toHaveStyleRule("width", "3px")
  expect(dot).toHaveStyleRule("height", "11px")
  expect(dot).toHaveStyleRule("border-radius", "4px")
  expect(dot).toHaveStyleRule("background-color", light.statusErrorText)
  expect(dot).toHaveAttribute("aria-hidden", "true")
})

it("renders a small plain zero count without a decorative dot", () => {
  renderWithProviders(
    <StatusWord size="small" dot={false} color="statusMutedText">
      {0}
    </StatusWord>
  )
  const word = screen.getByTestId("status-word")
  expect(word).toHaveTextContent("0")
  expect(word).toHaveStyleRule("font-size", "12px")
  expect(word).toHaveStyleRule("font-weight", "500")
  expect(word).toHaveStyleRule("font-variant-numeric", "tabular-nums")
  expect(word).toHaveStyleRule("gap", "4px")
  expect(screen.queryByTestId("status-word-dot")).not.toBeInTheDocument()
})

it("renders only the bar when the status is decorative", () => {
  renderWithProviders(<StatusWord size="small" strong dot="bar" aria-hidden="true" />)
  const word = screen.getByTestId("status-word")
  expect(word).toHaveAttribute("aria-hidden", "true")
  expect(word.children).toHaveLength(1)
  expect(word.firstElementChild).toBe(screen.getByTestId("status-word-dot"))
})

it("supports an explicit decorative mark size without changing its label", () => {
  renderWithProviders(
    <StatusWord size="small" dotSize={1.5} color="textInfo">
      Query removed
    </StatusWord>
  )
  expect(screen.getByTestId("status-word")).toHaveTextContent("Query removed")
  expect(screen.getByTestId("status-word-dot")).toHaveStyleRule("width", "6px")
})
