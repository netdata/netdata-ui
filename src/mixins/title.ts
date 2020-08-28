import { css } from "styled-components"
import { getColor } from "../theme"

export const title = css<any>`
  font-weight: bold;
  font-style: normal;
  color: ${getColor("text")};
`
