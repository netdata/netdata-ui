import styled from "styled-components"
import { title } from "../../mixins"
import { getColor } from "../../theme/utils"

export const H5 = styled.h5`
  ${title}
  font-size: 14px;
  line-height: 18px;
  color: ${getColor(["text"])};
`
