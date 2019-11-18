import styled from "styled-components"
import { text } from "../../mixins"
import { getColor } from "../../theme/utils"

export const TextBigger = styled.span`
  ${text}
  font-size: 24px;
  line-height: 32px;
  color: ${getColor(["text"])};
`
