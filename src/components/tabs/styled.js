import styled from "styled-components"
import { getColor, getSizeBy } from "src/theme/utils"

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

export const StyledTab = styled.div`
  display: flex;
  flex: 1 1 100%;
  justify-content: center;
  align-items: center;

  border-bottom: 4px solid
    ${props => (props.active ? getColor("accent") : getColor(["transparent", "full"]))};
  box-sizing: border-box;

  min-width: ${getSizeBy(10)};
  max-width: ${getSizeBy(26)};
  height: ${getSizeBy(6)};
  color: ${getColor("text")};

  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  &:hover {
    border-bottom: 4px solid ${getColor("primary")};
  }
`
