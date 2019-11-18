import styled from "styled-components"
import { title } from "../../mixins"
import { getColor } from "../../theme/utils"

export const H0 = styled.h1`
  ${title}
  font-size: 36px;
  line-height: 44px;
  color: ${getColor(["text"])};
`
