import styled from "styled-components"
import { text } from "../../mixins"
import { getColor } from "../../theme/utils"

export const TextBig = styled.span`
  ${text}
  font-size: 16px;
  line-height: 18px;
  color: ${getColor(["text"])};
`
