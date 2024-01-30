import styled from "styled-components"
import { getColor, getSizeBy } from "@/theme/utils"
import Flex from "@/components/templates/flex"

export const StyledTabsWrapper = styled(Flex).attrs(props => ({
  column: true,
  flexWrap: false,
  ...props,
}))``

export const StyledTabs = styled(Flex).attrs(props => ({
  as: "nav",
  row: true,
  flexWrap: false,
  justifyContent: "start",
  alignItems: "center",
  padding: [0, 0.5],
  flex: false,
  border: props.noDefaultBorder && {
    side: "bottom",
    size: "1px",
    type: "solid",
    color: "borderSecondary",
  },
  ...props,
}))``

export const StyledTab = styled(Flex).attrs(props => ({ flex: "grow", ...props }))`
  white-space: nowrap;
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
export const StyledTabMenu = styled(Flex)`
  white-space: nowrap;
  color: ${getColor("text")};
  padding: 4px 8px;
  background: ${({ active }) =>
    active ? getColor("menuItemSelected") : getColor(["transparent", "full"])};
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
  justify-content: flex-start;
  &:hover {
    background: ${getColor("menuItemHover")};
  }
`
