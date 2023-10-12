import { DefaultTheme as theme } from "@/theme/default"
import getMarginDimensions from "./getMarginDimensions"

it("renders", () => {
  ;[
    { margin: undefined, dimension: { top: "0", right: "0", bottom: "0", left: "0" } },
    { margin: [], dimension: { top: "0", right: "0", bottom: "0", left: "0" } },
    { margin: [0], dimension: { top: "0", right: "0", bottom: "0", left: "0" } },
    { margin: [1], dimension: { top: "4px", right: "4px", bottom: "4px", left: "4px" } },
    { margin: [1, 2], dimension: { top: "4px", right: "8px", bottom: "4px", left: "8px" } },
    { margin: [1, 2, 3], dimension: { top: "4px", right: "8px", bottom: "12px", left: "8px" } },
    { margin: [1, 2, 3, 4], dimension: { top: "4px", right: "8px", bottom: "12px", left: "16px" } },
    { margin: [1, 2, 3, 4, 5], dimension: { top: "0", right: "0", bottom: "0", left: "0" } },
  ].forEach(({ margin, dimension }) => {
    expect(getMarginDimensions(theme, margin)).toEqual(dimension)
  })
})
