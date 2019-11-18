import styled from "styled-components"
import { title } from "../../mixins"
import { getColor } from "../../theme/utils"

export const H3 = styled.h3`
  ${title}
  font-size: 20px;
  line-height: 26px;
  color: ${getColor(["text"])};
`
