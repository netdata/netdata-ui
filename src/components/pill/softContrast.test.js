import { getContrast, mix } from "polished"
import { DefaultTheme, DarkTheme } from "@/theme"
import { getPillColor } from "./mixins/colors"

// Soft is the default pill look, so its tone text must be readable on its own tinted fill.
const fills = theme => ({
  success: theme.colors.successSemi,
  warning: theme.colors.warningSemi,
  error: theme.colors.errorSemi,
  stale: mix(0.14, theme.colors.stale, theme.colors.mainBackground),
})

describe.each([
  ["light", DefaultTheme],
  ["dark", DarkTheme],
])("soft pill text in %s", (_, theme) => {
  it.each(["success", "warning", "error", "stale"])("%s reaches 4.5:1 on its fill", tone => {
    const text = theme.colors[getPillColor("softText", tone)]
    expect(getContrast(text, fills(theme)[tone])).toBeGreaterThanOrEqual(4.5)
  })
})
