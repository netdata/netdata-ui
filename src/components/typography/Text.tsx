import styled from "styled-components"
import { text } from "../../mixins"
import { getColor } from "../../theme/utils"

export const Text = styled.span`
  ${text}
  font-size: 14px;
  line-height: 18px;
  color: ${getColor(["text"])};
`
