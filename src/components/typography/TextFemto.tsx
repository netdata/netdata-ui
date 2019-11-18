import styled from "styled-components"
import { text } from "../../mixins"
import { getColor } from "../../theme/utils"

export const TextFemto = styled.span`
  ${text}
  font-size: 8px;
  line-height: 10px;
  color: ${getColor(["text"])};
`
