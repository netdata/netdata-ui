import { getContrast, getLuminance } from "polished"
import { DarkTheme, DefaultTheme } from "./index"
import rawColors from "./rawColors"

describe("theme colors", () => {
  it.each([DefaultTheme, DarkTheme])("separates menu interaction states in $name", ({ colors }) => {
    const {
      appSidebarBackground,
      workspaceSidebarBackground,
      menuItemHover,
      menuItemSelected,
      menuItemSelectedHover,
      menuItemSelectedText,
      primary,
      text,
    } = colors

    for (const surface of [appSidebarBackground, workspaceSidebarBackground]) {
      expect(getContrast(surface, menuItemHover)).toBeGreaterThanOrEqual(1.15)
      expect(getContrast(surface, menuItemSelected)).toBeGreaterThanOrEqual(1.25)
    }
    expect(getContrast(menuItemSelected, menuItemSelectedHover)).toBeGreaterThanOrEqual(1.1)
    expect(getContrast(text, menuItemHover)).toBeGreaterThanOrEqual(4.5)
    expect(getContrast(menuItemSelectedText, menuItemSelectedHover)).toBeGreaterThanOrEqual(4.5)
    expect(getContrast(primary, menuItemSelectedHover)).toBeGreaterThanOrEqual(3)
  })

  it("darkens light surfaces from the page to nested controls", () => {
    const colors = DefaultTheme.colors
    const luminance = role => getLuminance(colors[role])
    expect(colors.workspaceBackground).toBe(colors.appBackground)
    const steps = [
      "appBackground",
      "cardBackground",
      "cardNestedBackground",
      "controlBackground",
      "controlHoverBackground",
      "controlPressedBackground",
    ]

    steps.slice(1).forEach((role, i) => {
      expect(luminance(role)).toBeLessThan(luminance(steps[i]))
    })
    expect(luminance("appSidebarBackground")).toBeLessThan(luminance("workspaceBackground"))
    expect(luminance("workspaceSidebarBackground")).toBeLessThan(luminance("appSidebarBackground"))
    expect(luminance("inputBg")).toBeLessThan(luminance("workspaceSidebarBackground"))
    expect(luminance("segmentedSelectedBackground")).toBeLessThan(luminance("segmentedBackground"))
    expect(luminance("popoverBackground")).toBeLessThan(luminance("workspaceBackground"))
  })

  it("separates Sage control and neutral-button state roles from surfaces", () => {
    expect(DefaultTheme.colors.controlBackground).toBe("#EEF3EF")
    expect(DefaultTheme.colors.controlHoverBackground).toBe("#E8EFEA")
    expect(DefaultTheme.colors.buttonNeutralFill).toBe("#476453")
    expect(DefaultTheme.colors.buttonNeutralText).toBe("#FFFFFF")
    expect(DefaultTheme.colors.actionContrastText).toBe("#FFFFFF")
    expect(DarkTheme.colors.controlBackground).toBe("#222B25")
    expect(DarkTheme.colors.buttonNeutralFill).toBe("#B0C5B5")
    expect(DarkTheme.colors.buttonNeutralText).toBe("#171D19")
    expect(DarkTheme.colors.actionContrastText).toBe("#171D19")
  })

  it("owns metric gaps as a semantic color in both themes", () => {
    expect(DefaultTheme.colors.metricGap).toBe(rawColors.neutral.metricGapLight)
    expect(DarkTheme.colors.metricGap).toBe(rawColors.neutral.metricGapDark)
  })

  it("owns a contrasting Map search highlight in both themes", () => {
    expect(DefaultTheme.colors.mapSearchHighlight).toBe(rawColors.blue.blue100)
    expect(DarkTheme.colors.mapSearchHighlight).toBe(rawColors.blue.blue150)
  })

  it("keeps panelBgGrad on the Sage panel and canvas ladder", () => {
    expect(DefaultTheme.colors.panelBgGrad).toBe(DefaultTheme.colors.panelBg)
    expect(DarkTheme.colors.panelBgGrad).toBe(
      "linear-gradient(to right, #202723 0%, #171D19 50%, #202723 100%)"
    )
  })
})

describe("visual refresh token values", () => {
  it("uses an AA-contrast red for error text in light theme", () => {
    expect(DefaultTheme.colors.errorText).toBe(rawColors.red.red100)
  })

  it("uses an AA-contrast amber for warning in light theme", () => {
    expect(DefaultTheme.colors.warning).toBe(rawColors.yellow.yellow50)
  })

  it("gives dark input borders a visible edge", () => {
    expect(DarkTheme.colors.inputBorder).toBe("#98A69D")
    expect(DarkTheme.colors.inputBorderHover).toBe("#B0C5B5")
  })

  it("keeps dark focused input borders distinct from resting borders", () => {
    expect(DarkTheme.colors.inputBorderFocus).not.toBe(DarkTheme.colors.inputBorder)
  })

  it("renders tooltips as an inverse surface", () => {
    expect(DefaultTheme.colors.tooltip).toBe("#293A2F")
    expect(DefaultTheme.colors.tooltipText).toBe("#F0F4F1")
    expect(DarkTheme.colors.tooltip).toBe("#344239")
    expect(DarkTheme.colors.tooltipText).toBe("#F0F4F1")
  })

  it("keeps table row dividers visible under hover", () => {
    expect(DefaultTheme.colors.tableRowBgHover).toBe(rawColors.neutral.grey190)
    const { workspaceBackground, cardBackground, tableBorder, tableRowBgHover, text } =
      DarkTheme.colors
    expect(getLuminance(tableRowBgHover)).toBeGreaterThan(getLuminance(cardBackground))
    expect(getContrast(tableRowBgHover, workspaceBackground)).toBeGreaterThanOrEqual(1.25)
    expect(getContrast(tableRowBgHover, cardBackground)).toBeGreaterThanOrEqual(1.15)
    expect(getContrast(tableRowBgHover, tableBorder)).toBeGreaterThanOrEqual(1.15)
    expect(getContrast(text, tableRowBgHover)).toBeGreaterThanOrEqual(4.5)
  })

  it("makes dark grouped-row hover visible on table and card surfaces", () => {
    const { cardBackground, tableRowBg2, tableRowBg2Hover, textLite } = DarkTheme.colors
    expect(getLuminance(tableRowBg2Hover)).toBeGreaterThan(getLuminance(cardBackground))
    expect(getContrast(tableRowBg2Hover, tableRowBg2)).toBeGreaterThanOrEqual(1.25)
    expect(getContrast(tableRowBg2Hover, cardBackground)).toBeGreaterThanOrEqual(1.15)
    expect(getContrast(textLite, tableRowBg2Hover)).toBeGreaterThanOrEqual(4.5)
  })

  describe.each([DefaultTheme, DarkTheme])("grouped rows in $name theme", ({ colors }) => {
    it.each(["statusSuccessText", "statusErrorText", "statusWarningText", "statusMutedText"])(
      "%s stays readable at rest and on hover",
      role => {
        expect(getContrast(colors[role], colors.tableRowBg2)).toBeGreaterThanOrEqual(4.5)
        expect(getContrast(colors[role], colors.tableRowBg2Hover)).toBeGreaterThanOrEqual(4.5)
      }
    )
  })

  it("draws the column resizer in primary green", () => {
    expect(DefaultTheme.colors.resizerLine).toBe(rawColors.green.green100)
    expect(DarkTheme.colors.resizerLine).toBe(rawColors.green.green100)
  })

  it("lifts the dark modal header above the page", () => {
    expect(DarkTheme.colors.modalHeaderBackground).toBe("#29312C")
  })

  it("exposes hover and pressed steps for primary actions", () => {
    expect(DefaultTheme.colors.primaryHover).toBe(rawColors.green.green60)
    expect(DefaultTheme.colors.primaryPressed).toBe(rawColors.green.green50)
    expect(DarkTheme.colors.primaryHover).toBe(rawColors.green.green110)
    expect(DarkTheme.colors.primaryPressed).toBe(rawColors.green.green90)
  })
})

describe("soft pill text keys", () => {
  it.each([
    ["successSoftText", rawColors.green.green70, rawColors.green.green100],
    ["warningSoftText", rawColors.yellow.yellow50, rawColors.yellow.yellow70],
    ["errorSoftText", rawColors.red.red90, rawColors.red.red120],
    ["staleSoftText", rawColors.neutral.grey100, rawColors.neutral.grey150],
  ])("%s exists in both themes", (key, light, dark) => {
    expect(DefaultTheme.colors[key]).toBe(light)
    expect(DarkTheme.colors[key]).toBe(dark)
  })
})

describe("approved colour proposal", () => {
  it("adds controlBorder and textInfo to both themes", () => {
    expect(DefaultTheme.colors.controlBorder).toBe("#5C6A61")
    expect(DarkTheme.colors.controlBorder).toBe("#98A69D")
    expect(DefaultTheme.colors.textInfo).toBe(rawColors.blue.blue100)
    expect(DarkTheme.colors.textInfo).toBe(rawColors.blue.blue150)
  })

  it("darkens the light action green so white labels reach 4.5:1", () => {
    expect(DefaultTheme.colors.primary).toBe(rawColors.green.green70)
    expect(DefaultTheme.colors.primaryHover).toBe(rawColors.green.green60)
    expect(DefaultTheme.colors.primaryPressed).toBe(rawColors.green.green50)
    expect(DefaultTheme.colors.secondaryColor).toBe(rawColors.green.green70)
    expect(DefaultTheme.colors.link).toBe(rawColors.green.green70)
    expect(DefaultTheme.colors.linkHover).toBe(rawColors.green.green60)
    expect(DefaultTheme.colors.successText).toBe(rawColors.green.green70)
  })

  it("keeps the status green unchanged", () => {
    expect(DefaultTheme.colors.success).toBe(rawColors.green.green100)
  })

  it("raises warning text and placeholder contrast", () => {
    expect(DefaultTheme.colors.warningText).toBe(rawColors.yellow.yellow40)
    expect(DefaultTheme.colors.placeholder).toBe("#5C6A61")
    expect(DarkTheme.colors.placeholder).toBe("#98A69D")
  })
})

describe("tooltip surfaces", () => {
  // Apps draw tooltip containers on tooltipBg with tooltipText; both must be the same inverse pair as `tooltip`.
  it("paints tooltipBg like tooltip so tooltipText stays readable on it", () => {
    expect(DefaultTheme.colors.tooltipBg).toBe(DefaultTheme.colors.tooltip)
  })
})

it("paints dark tooltipBg like the drops tooltip", () => {
  expect(DarkTheme.colors.tooltipBg).toBe(DarkTheme.colors.tooltip)
})

describe("light surface ladder and field edges (audit L1–L4)", () => {
  const c = DefaultTheme.colors
  const n = rawColors.neutral
  it("uses distinct Sage canvas, panel and subtle surface roles", () => {
    expect(c.elementBackground).toBe("#EEF3EF")
    expect(c.mainChartBg).toBe("#FFFFFF")
    expect(c.mainBackgroundDisabled).toBe("#EEF3EF")
    expect(c.modalInfoBackground).toBe("#EEF3EF")
  })
  it("keeps the compact sidebar surface on its own Sage step", () => {
    expect(c.sideBarMini).toBe("#F0F3F0")
  })
  it("keeps the time picker neutral; green stays for status", () => {
    expect(c.datePickerPlayBg).toBe(n.grey190)
    expect(c.datePickerPausedBg).toBe(n.grey185)
  })
  it("gives fields one softer edge that still reaches 3:1, and darkens it on hover", () => {
    expect(c.controlBorder).toBe("#5C6A61")
    expect(c.inputBorder).toBe("#5C6A61")
    expect(c.inputBorderHover).toBe("#4D5C52")
    expect(c.inputBorderFocus).toBe("#4D5C52")
  })
  it("renders stale as a neutral grey", () => {
    expect(c.stale).toBe(n.grey130)
    expect(c.staleSemi).toBe(n.grey120)
  })
})


describe("Sage compact label contrast", () => {
  it.each([
    ["light", DefaultTheme],
    ["dark", DarkTheme],
  ])("keeps node badge labels readable on their neutral surface in %s theme", (_, theme) => {
    const { nodeBadgeColor, nodeBadgeBackground } = theme.colors
    expect(getContrast(nodeBadgeColor, nodeBadgeBackground)).toBeGreaterThanOrEqual(4.5)
  })

  it("keeps muted text readable on the dark pressed control surface", () => {
    const { textLite, controlPressedBackground } = DarkTheme.colors
    expect(getContrast(textLite, controlPressedBackground)).toBeGreaterThanOrEqual(4.5)
  })
})
