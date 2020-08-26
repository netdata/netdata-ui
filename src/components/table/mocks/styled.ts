import styled from "styled-components"
import { getSizeBy, getColor } from "../../../theme/utils"
import { Icon } from "../../icon"
import { Button } from "../../button"
import { Table } from ".."

export const StyledIcon = styled(Icon)<{ descending: boolean }>`
  transform: ${({ descending }) => (descending ? "" : "rotate(180deg)")};
  color: ${getColor("borderSecondary")};
`
export const ArrowIcon = styled(Icon)`
  color: ${getColor("borderSecondary")};
  width: 10px;
`

export const OptionsBtn = styled(Button)`
  color: ${getColor("borderSecondary")};
  margin-left: 60px;
`
export const IconPlaceholder = styled.div`
  width: ${getSizeBy(3)};
  height: ${getSizeBy(3)};
`

export const CellBox = styled.div<{ reversed?: boolean }>`
  height: ${getSizeBy(10)};
  display: flex;
  align-items: center;
  padding: 4px;
`

export const NestedCellContainer = styled.div``
export const NestedCell = styled.div`
  height: ${getSizeBy(10)};
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:not(:first-child) {
    border-top: 1px solid ${getColor("border")};
  }
`

export const Avatar = styled.img`
  margin-right: ${getSizeBy(2)};
  height: ${getSizeBy(3)};
  width: ${getSizeBy(3)};
  border-radius: 50%;
  display: inline-block;
`

export const EnhancedTable = styled(Table)`
  tbody {
    tr {
      td {
        vertical-align: top;
      }
    }
  }
`

export const UnreachableNodeMask = styled.div`
  position: absolute;
  left: 200px;
  top: 0;
  width: calc(100% - 200px);
  height: 100%;
  background: green;
  color: white;
  display: flex;
  align-items: center;
  padding-left: 80px;
`
