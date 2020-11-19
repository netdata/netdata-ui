import { css } from "styled-components"
import { getColor } from "src/theme"

export const title = css<any>`
  font-weight: bold;
  font-style: normal;
  color: ${getColor("text")};
`
