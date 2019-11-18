import styled from "styled-components"
import { title } from "../../mixins"
import { getColor } from "../../theme/utils"

export const H2 = styled.h2`
  ${title}
  font-size: 22px;
  line-height: 24px;
  color: ${getColor(["text"])};
`
