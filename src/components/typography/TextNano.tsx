import styled from "styled-components"
import { text } from "../../mixins"
import { getColor } from "../../theme/utils"

export const TextNano = styled.span`
  ${text}
  font-size: 10px;
  line-height: 13px;
  color: ${getColor(["text"])};

`
