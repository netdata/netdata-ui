import pseudos, { pseudoSelectors } from "./pseudos"
import { DefaultTheme as theme } from "@/theme/default"

const disabledColor = theme.colors.disabled
it("renders", () => {
  expect(pseudos({ theme })).toBe("")
})

it("render border (hover)", () => {
  const _hover = { border: { color: "disabled", side: "top", size: "1rem", type: "dashed" } }
  const pseudo = `
${pseudoSelectors["_hover"]}{
border-top: 1rem dashed ${disabledColor};
}`

  expect(pseudos({ theme, _hover })).toBe(pseudo)
})
