import { css } from "styled-components"
import { getValidatedControlColor } from "src/theme"

export const controlFocused = css<any>`
  border-color: ${getValidatedControlColor("controlFocused")};
  box-shadow: 0 0 0 1px ${getValidatedControlColor("controlFocused")};
`
