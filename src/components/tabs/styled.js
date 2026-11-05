import styled, { css } from "styled-components"
import { getColor, getSizeBy } from "@/theme/utils"
import Flex from "@/components/templates/flex"
import { segmentedTrack, segmentedItem } from "@/mixins/segmented"

const isContained = ({ variant }) => variant === "contained"

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
  padding: props.column ? [0, 0.5] : [0],
  flex: false,
  // Contained strips hold a few items and must not clip the items' outer focus ring.
  overflow: isContained(props) ? "visible" : { horizontal: "auto", vertical: "hidden" },
  flex: 0,
  role: "tablist",
  ...props,
}))`
  /* An inset line instead of a border, so the active tab's indicator can cover it (overflow clips borders). */
  ${({ noDefaultBorder, theme, ...props }) =>
    !noDefaultBorder &&
    !isContained(props) &&
    `box-shadow: inset 0 -1px 0 ${getColor("border")({ theme })};`}
  ${props =>
    isContained(props) &&
    css`
      ${segmentedTrack}
      align-self: flex-start;
    `}
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;

  &::-webkit-scrollbar {
    height: 0px;
  }
`

const activeColorByFlavour = {
  success: "primary",
  warning: "warning",
  error: "error",
  default: "primary",
}

const transparent = ["transparent", "full"]

const colors = ({ theme, active, flavour, variant }) => {
  if (variant === "contained") return segmentedItem

  const color = active ? activeColorByFlavour[flavour] || activeColorByFlavour.default : "text"
  const resolvedColor = getColor(color)({ theme })
  const indicator = active ? `inset 0 -2px 0 ${resolvedColor}` : "none"

  // Hover only shifts neutral surfaces so status hues stay reserved for state.
  const hover = active
    ? `box-shadow: ${indicator};`
    : `
    color: ${getColor("main")({ theme })};
    background: ${getColor("elementBackground")({ theme })};
    box-shadow: inset 0 -2px 0 ${getColor("textLite")({ theme })};
    & > span { color: ${getColor("main")({ theme })}; }
  `

  return `
    color: ${resolvedColor};
    background: ${getColor(transparent)({ theme })};
    box-shadow: ${indicator};
    & > span { color: ${resolvedColor}; }
    &:hover {
      ${hover}
    }
  `
}

export const StyledTab = styled(Flex).attrs(props => ({
  small: true,
  padding: isContained(props) ? [0, 1.25] : [0, 3],
  ...props,
}))`
  white-space: nowrap;
  overflow: hidden;
  flex-shrink: 0;
  /* safe: an over-long label starts at the left edge instead of being cut on both sides */
  justify-content: safe center;
  font-variant-numeric: tabular-nums;

  box-sizing: border-box;

  border-radius: 2px 2px 0 0;

  max-width: ${({ maxWidth }) => maxWidth ?? getSizeBy(26)};
  height: ${({ small, green, variant }) =>
    variant === "contained"
      ? getSizeBy(2.75)
      : green
        ? small
          ? getSizeBy(3)
          : getSizeBy(4)
        : small
          ? getSizeBy(4)
          : getSizeBy(5)};

  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};

  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  transition:
    color 140ms ease-out,
    background 140ms ease-out,
    box-shadow 140ms ease-out;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  /* Inset, because the scrolling strip clips anything drawn outside the tab. */
  &:focus-visible {
    outline: ${getSizeBy(0.25)} solid ${getColor("primary")};
    outline-offset: -${getSizeBy(0.25)};
  }

  ${colors}
`

export const TabLabel = styled.span`
  font-size: 13px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

// <data> carries the raw number and sits outside the line tab's "& > span" label colouring.
export const TabCount = styled.data`
  flex-shrink: 0;
  font-size: 12px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: ${getColor("textLite")};
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
