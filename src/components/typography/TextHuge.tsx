import styled from "styled-components"
import { text } from "../../mixins"
import { getColor } from "../../theme/utils"

export const TextHuge = styled.span`
  ${text}
  font-size: 36px;
  line-height: 44px;
  color: ${getColor(["text"])};
`
