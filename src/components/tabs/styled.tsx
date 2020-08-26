import styled from "styled-components"
import { getColor, getSizeBy } from "../../theme/utils"
import { TabProps } from "./tab"

export const StyledTabsWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
`

export const StyledTabs = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  border-bottom: 1px solid ${getColor("border")};
  box-sizing: border-box;

  padding: 0 2px;
`

type StyledTabProps = {
  onClick: () => void
  active?: boolean
  disabled?: boolean
}

export const StyledTab = styled.div<TabProps | StyledTabProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 4px solid
    ${props => (props.active ? getColor("primary") : getColor(["transparent", "full"]))};
  box-sizing: border-box;

  width: ${getSizeBy(26)};
  height: ${getSizeBy(6)};

  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  &:hover {
    border-bottom: 4px solid ${getColor("accent")};
  }
`
