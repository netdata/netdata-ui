import styled from "styled-components"
import { text } from "../../mixins"
import { getColor } from "../../theme/utils"

export const TextSmall = styled.span`
  ${text}
  font-size: 12px;
  line-height: 16px;
  color: ${getColor(["text"])};
`
