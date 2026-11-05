import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { getColor, getSizeBy } from "@/theme"
import { focusRing } from "@/mixins/focusRing"

export const TabRoot = styled(Flex)`
  ${focusRing}

  &:focus-visible {
    /* Tabs sit edge to edge inside an overflow container, so an outer offset would be clipped. */
    outline-offset: -${getSizeBy(0.25)};
  }
`

export const CloseButton = styled(Flex).attrs({
  as: "button",
  type: "button",
  "aria-label": "Close tab",
  width: 5,
  height: 5,
  alignItems: "center",
  justifyContent: "center",
  padding: [0],
  round: 1,
})`
  border: none;
  background: transparent;
  cursor: pointer;
  transition: background-color 140ms ease-out;

  &:hover {
    background-color: ${getColor("menuItemHover")};
  }

  ${focusRing}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`
