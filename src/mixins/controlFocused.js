import { css } from "styled-components"
import { getValidatedControlColor } from "@/theme"

export default css`
  border-color: ${getValidatedControlColor("controlFocused")};
  box-shadow: 0 0 0 1px ${getValidatedControlColor("controlFocused")};
`
