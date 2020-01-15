import styled from "styled-components"
import { getSizeBy, getColor } from "../../../theme/utils"
import { Icon } from "../../icon"
import { Button } from "../../button"

export const StyledIcon = styled(Icon)<{ descending: boolean }>`
  transform: ${({ descending }) => (descending ? "" : "rotate(180deg)")};
  color: ${getColor(["gray", "limedSpruce"])};
`
export const ArrowIcon = styled(Icon)`
  color: ${getColor(["gray", "limedSpruce"])};
  width: 10px;
`

export const OptionsBtn = styled(Button)`
  color: ${getColor(["gray", "limedSpruce"])};
  margin-left: 60px;
`
export const IconPlaceholder = styled.div`
  width: ${getSizeBy(3)};
  height: ${getSizeBy(3)};
`

export const CellBox = styled.div<{ reversed?: boolean }>`
  display: flex;
  flex-direction: ${({ reversed }) => (reversed ? "row-reverse" : "row")};
`

export const Avatar = styled.img`
  margin-right: ${getSizeBy(2)};
  height: ${getSizeBy(3)};
  width: ${getSizeBy(3)};
  border-radius: 50%;
  display: inline-block;
`
export const RowBox = styled.div`
  margin-top: ${getSizeBy(3)};
`
