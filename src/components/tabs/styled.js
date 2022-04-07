import styled from "styled-components"
import { getColor, getSizeBy } from "src/theme/utils"
import Flex from "src/components/templates/flex"

export const StyledTabsWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
`

export const StyledTabs = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  border-bottom: 1px solid
    ${({ noDefaultBorder }) =>
      noDefaultBorder ? getColor(["transparent", "full"]) : getColor("tabsBorder")};
  box-sizing: border-box;

  padding: 0 2px;
`

export const StyledTab = styled(Flex)`
  border-bottom: ${({ small }) => (small ? "2px" : "4px")} solid
    ${({ active }) => (active ? getColor("accent") : getColor(["transparent", "full"]))};
  box-sizing: border-box;

  min-width: ${({ minWidth }) => minWidth ?? getSizeBy(10)};
  max-width: ${({ maxWidth }) => maxWidth ?? getSizeBy(26)};
  height: ${({ small }) => (small ? getSizeBy(4) : getSizeBy(6))};
  color: ${getColor("text")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};

  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  &:hover {
    border-bottom: ${({ small }) => (small ? "2px" : "4px")} solid ${getColor("primary")};
  }

  & > span {
    font-weight: ${({ active }) => (active ? "bold" : "normal")};
  }
`
