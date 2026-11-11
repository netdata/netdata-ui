import { renderWithProviders, screen, userEvent } from "testUtilities"
import Pill from "./index"

describe("Pill component", () => {
  test("should render default component", () => {
    renderWithProviders(<Pill>Test</Pill>)

    expect(screen.queryByTestId("pill")).toBeInTheDocument()
    expect(screen.queryByTestId("pill-text")).toBeInTheDocument()
    expect(screen.queryByTestId("pill-text")).toHaveAttribute("color", "text")
    expect(screen.queryByTestId("pill-text")).toHaveStyleRule("font-size", "13px")
    expect(screen.queryByTestId("pill-icon-left")).not.toBeInTheDocument()
    expect(screen.queryByTestId("pill-icon-right")).not.toBeInTheDocument()
  })

  test("should render component with custom test id", () => {
    renderWithProviders(<Pill data-testid="custom-pill">Test</Pill>)

    expect(screen.queryByTestId("pill")).not.toBeInTheDocument()
    expect(screen.queryByTestId("pill-text")).not.toBeInTheDocument()
    expect(screen.queryByTestId("custom-pill")).toBeInTheDocument()
    expect(screen.queryByTestId("custom-pill-text")).toBeInTheDocument()
  })

  test("should render component with left icon only", () => {
    renderWithProviders(<Pill icon="alarm_bell" />)

    expect(screen.queryByTestId("pill-icon-left")).toBeInTheDocument()
    expect(screen.queryByTestId("pill-text")).not.toBeInTheDocument()
    expect(screen.queryByTestId("pill-icon-right")).not.toBeInTheDocument()
  })

  test("should render component with right icon only", () => {
    renderWithProviders(<Pill icon="alarm_bell" reverse />)

    expect(screen.queryByTestId("pill-icon-left")).not.toBeInTheDocument()
    expect(screen.queryByTestId("pill-text")).not.toBeInTheDocument()
    expect(screen.queryByTestId("pill-icon-right")).toBeInTheDocument()
  })

  test("should render component with small text", () => {
    renderWithProviders(<Pill textSize="small">Test</Pill>)

    expect(screen.queryByTestId("pill-text")).toHaveStyleRule("font-size", "12px")
  })

  test("should render component with normal text", () => {
    renderWithProviders(<Pill size="normal">Test</Pill>)

    expect(screen.queryByTestId("pill-text")).toHaveStyleRule("font-size", "13px")
  })

  test("should render component with custom colored text", () => {
    const mockedColor = "primary"
    renderWithProviders(<Pill color={mockedColor}>Test</Pill>)

    expect(screen.queryByTestId("pill-text")).toHaveAttribute("color", mockedColor)
  })

  test("should render component with hollowed warning colored text", () => {
    renderWithProviders(
      <Pill hollow flavour="warning">
        Test
      </Pill>
    )

    expect(screen.queryByTestId("pill-text")).toHaveAttribute("color", "warning")
  })

  test("should render clickable component", () => {
    const mockedOnClick = jest.fn()
    renderWithProviders(<Pill onClick={mockedOnClick}>Test</Pill>)

    expect(screen.queryByTestId("pill")).toHaveAttribute("cursor", "pointer")
  })
})

describe("Pill styles", () => {
  const { DefaultTheme, DarkTheme } = require("@/theme")
  const light = DefaultTheme.colors
  const colorOf = flavour => ({ clear: "success", critical: "error" })[flavour] || flavour

  it.each([
    ["default", {}, "20px"],
    ["normal", { size: "normal" }, "20px"],
    ["small", { size: "small" }, "18px"],
    ["large", { size: "large" }, "24px"],
    ["tiny", { tiny: true }, "14px"],
  ])("uses the %s height ladder step as min-height", (_, props, minHeight) => {
    renderWithProviders(<Pill {...props}>Test</Pill>)
    expect(screen.getByTestId("pill")).toHaveStyleRule("min-height", minHeight)
  })

  it.each([
    ["default", {}, "0 8px"],
    ["small", { size: "small" }, "0 6px"],
    ["large", { size: "large" }, "0 10px"],
    ["tiny", { tiny: true }, "0 4px"],
  ])("pads %s pills horizontally only, on the 4px grid", (_, props, padding) => {
    renderWithProviders(<Pill {...props}>Test</Pill>)
    expect(screen.getByTestId("pill")).toHaveStyleRule("padding", padding)
  })

  it("lets a consumer height win over the ladder", () => {
    renderWithProviders(<Pill height="30px">Test</Pill>)
    expect(screen.getByTestId("pill")).toHaveStyleRule("height", "30px")
    expect(screen.getByTestId("pill")).not.toHaveStyleRule("min-height", "20px")
  })

  it("lets a consumer padding win", () => {
    renderWithProviders(<Pill padding={[1, 3]}>Test</Pill>)
    expect(screen.getByTestId("pill")).toHaveStyleRule("padding", "4px 12px")
  })

  it("renders the neutral filled pill as a neutral fill with text color", () => {
    renderWithProviders(<Pill filled>Test</Pill>)
    expect(screen.getByTestId("pill")).toHaveStyleRule("background-color", light.neutralHighlight)
    expect(screen.getByTestId("pill")).toHaveStyleRule(
      "border",
      `1px solid ${light.neutralHighlight}`
    )
    expect(screen.getByTestId("pill-text")).toHaveAttribute("color", "text")
  })

  it("renders the neutral filled pill with the dark neutral fill in dark theme", () => {
    renderWithProviders(<Pill filled>Test</Pill>, { theme: DarkTheme })
    expect(screen.getByTestId("pill")).toHaveStyleRule(
      "background-color",
      DarkTheme.colors.neutralHighlight
    )
  })

  it.each(["success", "clear", "warning", "error", "critical", "stale"])(
    "keeps bright text on the saturated %s fill",
    flavour => {
      renderWithProviders(
        <Pill filled flavour={flavour}>
          Test
        </Pill>
      )
      expect(screen.getByTestId("pill")).toHaveStyleRule(
        "background-color",
        light[colorOf(flavour)]
      )
      expect(screen.getByTestId("pill-text")).toHaveAttribute("color", "bright")
    }
  )

  it.each(["idleClear", "idleError", "idleWarning"])(
    "uses text color on the pale %s fill",
    flavour => {
      renderWithProviders(
        <Pill filled flavour={flavour}>
          Test
        </Pill>
      )
      expect(screen.getByTestId("pill-text")).toHaveAttribute("color", "text")
    }
  )

  it("colors a neutral filled pill icon like its text", () => {
    renderWithProviders(
      <Pill filled icon="alarm_bell">
        Test
      </Pill>
    )
    expect(screen.getByTestId("pill-icon-left")).toHaveAttribute("color", "text")
  })

  it("keeps the hollow pill transparent with a status text color", () => {
    renderWithProviders(
      <Pill hollow flavour="error">
        Test
      </Pill>
    )
    expect(screen.getByTestId("pill")).toHaveStyleRule("background-color", "rgba(255,255,255,0.0)")
    expect(screen.getByTestId("pill-text")).toHaveAttribute("color", "error")
  })

  it("renders semi pills with the soft status fill and border", () => {
    renderWithProviders(
      <Pill hollow semi flavour="warning">
        Test
      </Pill>
    )
    expect(screen.getByTestId("pill")).toHaveStyleRule("background-color", light.warningSemi)
    expect(screen.getByTestId("pill")).toHaveStyleRule("border", `1px solid ${light.warningSemi}`)
  })

  it("uses tabular numerals so counts keep their width", () => {
    renderWithProviders(<Pill>128</Pill>)
    expect(screen.getByTestId("pill")).toHaveStyleRule("font-variant-numeric", "tabular-nums")
  })

  it("keeps the full pill radius by default and 4px when round is false", () => {
    const { unmount } = renderWithProviders(<Pill>Test</Pill>)
    expect(screen.getByTestId("pill")).toHaveStyleRule("border-radius", "30px")
    unmount()
    renderWithProviders(<Pill round={false}>Test</Pill>)
    expect(screen.getByTestId("pill")).toHaveStyleRule("border-radius", "4px")
  })

  it("renders strong text when normal is false", () => {
    renderWithProviders(<Pill normal={false}>Test</Pill>)
    expect(screen.getByTestId("pill-text")).toHaveStyleRule("font-weight", "600")
  })

  it("renders the icon on the right when reversed with text", () => {
    renderWithProviders(
      <Pill icon="alarm_bell" reverse>
        Test
      </Pill>
    )
    const pill = screen.getByTestId("pill")
    expect(pill.lastChild).toBe(screen.getByTestId("pill-icon-right"))
  })

  it("calls onClick when clicked", async () => {
    const onClick = jest.fn()
    renderWithProviders(<Pill onClick={onClick}>Test</Pill>)
    await userEvent.click(screen.getByTestId("pill"))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

describe("Pill soft look (default)", () => {
  const { getContrast } = require("polished")
  const { DefaultTheme, DarkTheme, getRgbColor } = require("@/theme")
  const light = DefaultTheme.colors
  const rgba = (token, opacity) => getRgbColor(token, opacity)({ theme: DefaultTheme })

  it.each([
    ["success", "successSemi", "success"],
    ["clear", "successSemi", "success"],
    ["warning", "warningSemi", "warning"],
    ["error", "errorSemi", "error"],
    ["critical", "errorSemi", "error"],
  ])("tints the %s pill and rings it at 35%%", (flavour, fill, ring) => {
    renderWithProviders(<Pill flavour={flavour}>Test</Pill>)
    expect(screen.getByTestId("pill")).toHaveStyleRule("background-color", light[fill])
    expect(screen.getByTestId("pill")).toHaveStyleRule("border", `1px solid ${rgba(ring, 0.35)}`)
    expect(screen.getByTestId("pill-text")).toHaveAttribute("color", `${ring}SoftText`)
  })

  it("tints the stale pill with stale at 14%", () => {
    renderWithProviders(<Pill flavour="stale">Test</Pill>)
    expect(screen.getByTestId("pill")).toHaveStyleRule("background-color", rgba("stale", 0.14))
    expect(screen.getByTestId("pill")).toHaveStyleRule("border", `1px solid ${rgba("stale", 0.35)}`)
    expect(screen.getByTestId("pill-text")).toHaveAttribute("color", "staleSoftText")
  })

  it("renders the neutral soft pill on the neutral highlight with a border ring", () => {
    renderWithProviders(<Pill>Test</Pill>)
    expect(screen.getByTestId("pill")).toHaveStyleRule("background-color", light.neutralHighlight)
    expect(screen.getByTestId("pill")).toHaveStyleRule("border", `1px solid ${light.border}`)
    expect(screen.getByTestId("pill-text")).toHaveAttribute("color", "text")
  })

  it("rings the neutral soft pill with the border token in dark theme", () => {
    renderWithProviders(<Pill>Test</Pill>, { theme: DarkTheme })
    expect(screen.getByTestId("pill")).toHaveStyleRule(
      "border",
      `1px solid ${DarkTheme.colors.border}`
    )
  })

  it("renders the muted soft pill without a status hue", () => {
    renderWithProviders(<Pill flavour="muted">Test</Pill>)
    expect(screen.getByTestId("pill")).toHaveStyleRule("background-color", "rgba(255,255,255,0.0)")
    expect(screen.getByTestId("pill")).toHaveStyleRule("border", `1px solid ${light.border}`)
    expect(screen.getByTestId("pill-text")).toHaveAttribute("color", "textLite")
  })

  it("uses weight 500 text, and 600 when normal is false", () => {
    const { unmount } = renderWithProviders(<Pill flavour="error">Test</Pill>)
    expect(screen.getByTestId("pill-text")).toHaveStyleRule("font-weight", "500")
    unmount()
    renderWithProviders(
      <Pill flavour="error" normal={false}>
        Test
      </Pill>
    )
    expect(screen.getByTestId("pill-text")).toHaveStyleRule("font-weight", "600")
  })

  it("keeps normal weight on filled and hollow pills", () => {
    renderWithProviders(
      <>
        <Pill data-testid="filled" filled flavour="error">
          Test
        </Pill>
        <Pill data-testid="hollow" hollow flavour="error">
          Test
        </Pill>
      </>
    )
    expect(screen.getByTestId("filled-text")).toHaveStyleRule("font-weight", "normal")
    expect(screen.getByTestId("hollow-text")).toHaveStyleRule("font-weight", "normal")
  })

  it("colours the icon like the soft text", () => {
    renderWithProviders(
      <Pill flavour="warning" icon="alarm_bell">
        Test
      </Pill>
    )
    expect(screen.getByTestId("pill-icon-left")).toHaveAttribute("color", "warningSoftText")
  })

  it("lets background, borderColor and color override the soft look", () => {
    renderWithProviders(
      <Pill flavour="stale" background="panel" borderColor="primary" color="main">
        Test
      </Pill>
    )
    expect(screen.getByTestId("pill")).toHaveStyleRule("background-color", light.panel)
    expect(screen.getByTestId("pill")).toHaveStyleRule("border", `1px solid ${light.primary}`)
    expect(screen.getByTestId("pill-text")).toHaveAttribute("color", "main")
  })

  it("lets hollow win over filled", () => {
    renderWithProviders(
      <Pill filled hollow flavour="error">
        Test
      </Pill>
    )
    expect(screen.getByTestId("pill")).toHaveStyleRule("background-color", "rgba(255,255,255,0.0)")
    expect(screen.getByTestId("pill-text")).toHaveAttribute("color", "error")
  })

  it.each([
    ["filled", { filled: true }, "textLite", "bright"],
    ["hollow", { hollow: true }, "rgba(255,255,255,0.0)", "textLite"],
    ["semi", { hollow: true, semi: true }, "neutralHighlight", "textLite"],
  ])("supports the muted tone on the %s look", (_, props, fill, ink) => {
    renderWithProviders(
      <Pill flavour="muted" {...props}>
        Test
      </Pill>
    )
    expect(screen.getByTestId("pill")).toHaveStyleRule("background-color", light[fill] || fill)
    expect(screen.getByTestId("pill-text")).toHaveAttribute("color", ink)
  })

  it.each([
    ["light", DefaultTheme],
    ["dark", DarkTheme],
  ])("makes the hollow semi stale text readable in the %s theme", (_, theme) => {
    renderWithProviders(
      <Pill hollow semi flavour="stale">
        Test
      </Pill>,
      { theme }
    )
    const text = screen.getByTestId("pill-text")
    const ink = theme.colors[text.getAttribute("color")]
    // No theme token reaches 4.5:1 on staleSemi in both themes; bright + bold is the best (3.7:1).
    expect(getContrast(ink, theme.colors.staleSemi)).toBeGreaterThanOrEqual(3)
    expect(text).toHaveStyleRule("font-weight", "600")
  })
})

describe("Pill dot", () => {
  const { DefaultTheme } = require("@/theme")
  const light = DefaultTheme.colors

  it.each([true, "filled"])("renders a 7px filled tone dot before the label for %s", dot => {
    renderWithProviders(
      <Pill flavour="error" dot={dot}>
        Test
      </Pill>
    )
    const marker = screen.getByTestId("pill-dot")
    expect(marker).toHaveAttribute("aria-hidden", "true")
    expect(marker).toHaveStyleRule("width", "7px")
    expect(marker).toHaveStyleRule("height", "7px")
    expect(marker).toHaveStyleRule("background-color", light.errorSoftText)
    expect(marker.nextSibling).toBe(screen.getByTestId("pill-text"))
  })

  it("renders a 1.5px ring dot for hollow", () => {
    renderWithProviders(
      <Pill flavour="warning" dot="hollow">
        Test
      </Pill>
    )
    const marker = screen.getByTestId("pill-dot")
    expect(marker).toHaveStyleRule("border", `1.5px solid ${light.warning}`)
    expect(marker).not.toHaveStyleRule("background-color", light.warning)
  })

  it("keeps the dot before the label when the icon is reversed", () => {
    renderWithProviders(
      <Pill dot icon="alarm_bell" reverse>
        Test
      </Pill>
    )
    const pill = screen.getByTestId("pill")
    expect(pill.firstChild).toBe(screen.getByTestId("pill-dot"))
    expect(pill.lastChild).toBe(screen.getByTestId("pill-icon-right"))
  })

  it("follows the filled text colour so the dot stays visible on a saturated fill", () => {
    renderWithProviders(
      <Pill filled flavour="success" dot>
        Test
      </Pill>
    )
    expect(screen.getByTestId("pill-dot")).toHaveStyleRule("background-color", light.bright)
  })

  it("renders no dot by default", () => {
    renderWithProviders(<Pill>Test</Pill>)
    expect(screen.queryByTestId("pill-dot")).not.toBeInTheDocument()
  })
})

describe("hollow idle pills", () => {
  const { DefaultTheme, getRgbColor } = require("@/theme")
  const light = DefaultTheme.colors
  const rgba = (token, opacity) => getRgbColor(token, opacity)({ theme: DefaultTheme })

  // Idle tones are background tints; as text and border they vanish, so idle reads as quiet grey on a faint tone edge.
  it.each([
    ["idleError", "error"],
    ["idleWarning", "warning"],
    ["idleClear", "success"],
  ])("%s uses muted text and a 35%% %s border", (flavour, tone) => {
    renderWithProviders(
      <Pill flavour={flavour} hollow>
        0
      </Pill>
    )
    expect(screen.getByTestId("pill")).toHaveStyleRule("border", `1px solid ${rgba(tone, 0.35)}`)
    expect(screen.getByTestId("pill-text")).toHaveAttribute("color", "textLite")
  })

  it("leaves filled idle pills unchanged", () => {
    renderWithProviders(
      <Pill flavour="idleError" filled>
        0
      </Pill>
    )
    expect(screen.getByTestId("pill")).toHaveStyleRule("background-color", light.idleError)
  })
})

it.each([
  ["light", require("@/theme").DefaultTheme, "8%"],
  ["dark", require("@/theme").DarkTheme, "13%"],
])(
  "supports a subtle status pill with preserved geometry and custom dot ink in %s",
  (name, theme, tint) => {
    renderWithProviders(
      <Pill
        appearance="subtle"
        color="statusMutedText"
        flavour="muted"
        dot="hollow"
        height="22px"
        padding={[0, 2.25]}
        round="999px"
        gap={1.5}
        textProps={{ lineHeight: "1" }}
      >
        Accepted
      </Pill>,
      { theme }
    )
    const pill = screen.getByTestId("pill")
    expect(pill).toHaveStyleRule("height", "22px")
    expect(pill).toHaveStyleRule("padding", "0 9px")
    expect(pill).toHaveStyleRule("border-radius", "999px")
    expect(pill).toHaveStyleRule("border", "0")
    expect(pill).toHaveStyleRule(
      "background",
      `color-mix( in srgb,currentColor ${tint},transparent )`
    )
    expect(pill).toHaveStyleRule(
      "box-shadow",
      "inset 0 0 0 1px color-mix(in srgb,currentColor 22%,transparent)"
    )
    expect(screen.getByTestId("pill-dot")).toHaveStyleRule(
      "border",
      `1.5px solid ${theme.colors.statusMutedText}`
    )
    expect(screen.getByTestId("pill-text")).toHaveStyleRule("font-weight", "500")
  }
)
