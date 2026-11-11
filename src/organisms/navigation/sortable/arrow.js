import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { Icon } from "@/components/icon/icon"
import { getColor, getSizeBy } from "@/theme"
import { focusRing } from "@/mixins/focusRing"

const labels = { navLeft: "Scroll tabs left", navRight: "Scroll tabs right" }

const IconWrapper = styled(Flex).attrs({
  as: "button",
  type: "button",
  height: "100%",
  width: 6,
  alignItems: "center",
  justifyContent: "center",
  padding: [0],
  background: "topBarBg",
  position: "absolute",
  cursor: "pointer",
  zIndex: 3,
})`
  top: 0;
  /* Reset the native button border but keep the divider drawn by the border mixin. */
  border-style: none;
  border-${({ border }) => border.side}-style: solid;
  transition: background-color 140ms ease-out;

  &:hover {
    background-color: ${getColor("menuItemHover")};
  }

  ${focusRing}

  &:focus-visible {
    outline-offset: -${getSizeBy(0.25)};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export default ({ onClick, name, right }) => (
  <IconWrapper
    onClick={onClick}
    aria-label={labels[name]}
    sx={right ? { right: 0 } : { left: 0 }}
    border={{ side: right ? "left" : "right", color: "border" }}
  >
    <Icon name={name} color="text" width={8} height={8} />
  </IconWrapper>
)
