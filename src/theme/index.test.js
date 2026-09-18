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

  it("owns a horizontal panel background gradient in both themes", () => {
    expect(DefaultTheme.colors.panelBgGrad).toBe(
      `linear-gradient(to right, ${rawColors.neutral.grey195} 0%, ${rawColors.neutral.white} 50%, ${rawColors.neutral.grey195} 100%)`
    )
    expect(DarkTheme.colors.panelBgGrad).toBe(
      `linear-gradient(to right, ${rawColors.neutral.grey25} 0%, ${rawColors.neutral.grey15} 50%, ${rawColors.neutral.grey25} 100%)`
    )
  })
})
