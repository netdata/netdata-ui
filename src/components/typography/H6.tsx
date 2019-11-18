import styled from "styled-components"
import { title } from "../../mixins"
import { getColor } from "../../theme/utils"

export const H6 = styled.h6`
  ${title}
  font-size: 12px;
  line-height: 14px;
  color: ${getColor(["text"])};
`
