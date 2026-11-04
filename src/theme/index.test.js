import { DarkTheme, DefaultTheme } from "./index"
import rawColors from "./rawColors"

describe("theme colors", () => {
  it("owns metric gaps as a semantic color in both themes", () => {
    expect(DefaultTheme.colors.metricGap).toBe(rawColors.neutral.metricGapLight)
    expect(DarkTheme.colors.metricGap).toBe(rawColors.neutral.metricGapDark)
  })

  it("owns a contrasting Map search highlight in both themes", () => {
    expect(DefaultTheme.colors.mapSearchHighlight).toBe(rawColors.blue.blue100)
    expect(DarkTheme.colors.mapSearchHighlight).toBe(rawColors.blue.blue150)
  })

  it("keeps panelBgGrad flat in light so legacy panels follow the surface ladder", () => {
    expect(DefaultTheme.colors.panelBgGrad).toBe(DefaultTheme.colors.panelBg)
    expect(DarkTheme.colors.panelBgGrad).toBe(
      `linear-gradient(to right, ${rawColors.neutral.grey25} 0%, ${rawColors.neutral.grey15} 50%, ${rawColors.neutral.grey25} 100%)`
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
    expect(DarkTheme.colors.inputBorder).toBe(rawColors.neutral.grey85)
    expect(DarkTheme.colors.inputBorderHover).toBe(rawColors.neutral.grey100)
  })

  it("keeps dark focused input borders distinct from resting borders", () => {
    expect(DarkTheme.colors.inputBorderFocus).not.toBe(DarkTheme.colors.inputBorder)
  })

  it("renders tooltips as an inverse surface", () => {
    expect(DefaultTheme.colors.tooltip).toBe(rawColors.neutral.limedSpruce)
    expect(DefaultTheme.colors.tooltipText).toBe(rawColors.neutral.grey195)
    expect(DarkTheme.colors.tooltip).toBe(rawColors.neutral.grey55)
    expect(DarkTheme.colors.tooltipText).toBe(rawColors.neutral.grey185)
  })

  it("keeps table row dividers visible under hover", () => {
    expect(DefaultTheme.colors.tableRowBgHover).toBe(rawColors.neutral.grey190)
    expect(DarkTheme.colors.tableRowBgHover).toBe(rawColors.neutral.grey30)
  })

  it("draws the column resizer in primary green", () => {
    expect(DefaultTheme.colors.resizerLine).toBe(rawColors.green.green100)
    expect(DarkTheme.colors.resizerLine).toBe(rawColors.green.green100)
  })

  it("lifts the dark modal header above the page", () => {
    expect(DarkTheme.colors.modalHeaderBackground).toBe(rawColors.neutral.grey30)
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
    expect(DefaultTheme.colors.controlBorder).toBe(rawColors.neutral.grey130)
    expect(DarkTheme.colors.controlBorder).toBe(rawColors.neutral.grey120)
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
    expect(DefaultTheme.colors.placeholder).toBe(rawColors.neutral.grey110)
    expect(DarkTheme.colors.placeholder).toBe(rawColors.neutral.grey125)
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
  it("uses one lightest grey: blackhaze keys sit on grey195", () => {
    ;["elementBackground", "mainChartBg", "mainBackgroundDisabled", "modalInfoBackground"].forEach(key =>
      expect([key, c[key]]).toEqual([key, n.grey195])
    )
  })
  it("puts the sidebar on grey190 with hover one step darker", () => {
    expect(c.sideBarMini).toBe(n.grey190)
    expect(c.menuItemHover).toBe(n.grey185)
  })
  it("keeps the time picker neutral; green stays for status", () => {
    expect(c.datePickerPlayBg).toBe(n.grey190)
    expect(c.datePickerPausedBg).toBe(n.grey185)
  })
  it("gives fields one softer edge that still reaches 3:1, and darkens it on hover", () => {
    expect(c.controlBorder).toBe(n.grey130)
    expect(c.inputBorder).toBe(n.grey130)
    expect(c.inputBorderHover).toBe(n.grey110)
    expect(c.inputBorderFocus).toBe(n.grey110)
  })
  it("renders stale as a neutral grey", () => {
    expect(c.stale).toBe(n.grey130)
    expect(c.staleSemi).toBe(n.grey120)
  })
})
