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
  border: !props.noDefaultBorder && {
    side: "bottom",
    size: "1px",
    type: "solid",
    color: "border",
  },
  ...props,
}))``

export const StyledTab = styled(Flex).attrs(props => ({ small: true, padding: [0, 6], ...props }))`
  white-space: nowrap;
  border-bottom: ${({ small, green }) => (green ? "1px" : small ? "1px" : "2px")} solid
    ${({ active, green }) =>
      active ? getColor("accent") : green ? getColor(["transparent", "full"]) : getColor("border")};
  box-sizing: border-box;

  border-radius: 4px 4px 0 0;

  max-width: ${({ maxWidth }) => maxWidth ?? getSizeBy(26)};
  height: ${({ small, green }) =>
    green ? (small ? getSizeBy(3) : getSizeBy(4)) : small ? getSizeBy(4) : getSizeBy(6)};

  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  background: ${({ active }) =>
    active ? getColor("menuItemSelected") : getColor("modalBackground")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  &:hover {
    border-bottom: ${({ small, green }) => (green ? "1px" : small ? "1px" : "2px")} solid
      ${getColor("primary")};
  }

  & > span {
    color: ${({ active }) => (active ? getColor("primary") : getColor("menuItem"))};
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
