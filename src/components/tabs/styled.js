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

const colorsByFlavour = {
  success: { background: "menuItemSelected", borderColor: "accent", color: "menuItem" },
  warning: { background: "warningSemi", borderColor: "warning", color: "menuItem" },
  error: { background: "errorSemi", borderColor: "error", color: "menuItem" },
  default: { background: "modalBackground", borderColor: "border", color: "menuItem" },
}

const activeColorsByFlavour = {
  success: { ...colorsByFlavour.success, color: "primary" },
  warning: { ...colorsByFlavour.warning, color: "warning" },
  error: { ...colorsByFlavour.error, color: "error" },
  default: { background: "menuItemSelected", borderColor: "accent", color: "primary" },
}

const hoverColorsByFlavour = {
  ...colorsByFlavour,
  default: { ...colorsByFlavour.default, borderColor: "primary" },
}

const colors = ({ theme, active, green, flavour }) => {
  const dictionary = active ? activeColorsByFlavour : colorsByFlavour
  const { background, borderColor, color } = dictionary[flavour] || dictionary.default

  const styles = [
    `border-bottom-color: ${getColor(borderColor)({ theme })};`,
    `background: ${getColor(background)({ theme })};`,
    `& > span { color: ${getColor(color)({ theme })}; }`,
  ]

  if (!active && green) {
    styles.push(`border-bottom-color: ${getColor(["transparent", "full"])({ theme })};`)
  }

  const hoverStyles = [
    `&:hover {
    border-bottom-color: ${getColor((hoverColorsByFlavour[flavour] || hoverColorsByFlavour.default)?.borderColor)({ theme })};
  }`,
  ]

  return [...styles, ...hoverStyles].join("")
}

export const StyledTab = styled(Flex).attrs(props => ({
  small: true,
  padding: [0, 6],
  ...props,
}))`
  white-space: nowrap;
  border-bottom-width: 1px;
  border-bottom-style: solid;

  box-sizing: border-box;

  border-radius: 2px 2px 0 0;

  max-width: ${({ maxWidth }) => maxWidth ?? getSizeBy(26)};
  height: ${({ small, green }) =>
    green ? (small ? getSizeBy(3) : getSizeBy(4)) : small ? getSizeBy(4) : getSizeBy(5)};

  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};

  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  margin-bottom: -1px;

  ${colors}
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
