import { getReadableColor } from "./utils"
import { getContrast } from "polished"
import { DefaultTheme } from "./default"
import { DarkTheme } from "./dark"

describe("getReadableColor", () => {
  it("chooses the higher-contrast theme-owned ink for light and dark fills", () => {
    expect(getReadableColor("onColorDark", "onColorDark", "onColorLight")({ theme: DefaultTheme })).toBe(
      "#FFFFFF"
    )
    expect(getReadableColor("onColorLight", "onColorDark", "onColorLight")({ theme: DarkTheme })).toBe(
      "#000000"
    )
  })

  it("keeps the midpoint grey at AA contrast by choosing a true endpoint", () => {
    const color = getReadableColor("#777777")({ theme: DefaultTheme })
    expect(getContrast(color, "#777777")).toBeGreaterThanOrEqual(4.5)
    expect(color).toBe("#000000")
  })

  it("accepts uppercase RGB background values from chart annotations", () => {
    expect(getReadableColor("RGB(119, 119, 119)")({ theme: DefaultTheme })).toBe("#000000")
  })
})
