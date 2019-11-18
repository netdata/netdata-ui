import styled from "styled-components"
import { title } from "../../mixins"
import { getColor } from "../../theme/utils"

export const H4 = styled.h4`
  ${title}
  font-size: 16px;
  line-height: 21px;
  color: ${getColor(["text"])};
`
