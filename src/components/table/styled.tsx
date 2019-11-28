import styled from "styled-components"
import { getSizeBy, getColor } from "../../theme/utils"
import { Icon } from "../icon"
import { Button } from "../button"

export const StyledTable = styled.table`
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  min-width: ${getSizeBy(90)};
`

export const StyledThead = styled.thead`
  & > tr th {
    border-spacing: 0;
    border-bottom: 1px solid #aeb3b7;
    padding-bottom: 5px;
  }
`
export const StyledRow = styled.tr`
  padding-top: 25px;
  padding-left: 10px;
  padding-right: 10px;
`

export const StyledIcon = styled(Icon)`
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
