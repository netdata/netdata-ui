import { css } from "styled-components"
import { getColor } from "../theme"

export const text = css<any>`
  font-weight: normal;
  font-style: normal;
  color: ${getColor("text")};
`
