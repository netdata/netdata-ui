import styled from "styled-components"
import { propOrElse, getColor } from "@/theme/utils"
import { scrimColor, sidePanelShadow } from "@/components/templates/layer/mixins/elevation"

const LEFT = 2
const RIGHT = -2

const shadowOffset = ({ shadowSide = true }) => (shadowSide ? LEFT : RIGHT)
const innerEdge = ({ side }) => (side === "right" ? "left" : "right")

export const ComponentBox = styled.div`
  display: flex;
  flex-direction: ${({ isRight }) => (isRight ? "row-reverse" : "row")};
  top: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
`

export const SidebarBox = styled.aside`
  overflow: hidden;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 50%;
`

export const DisabledOverlay = styled.aside`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0; // needed for dashboard where body has some left-padding
  height: 100vh;
  width: 100vw;
  min-width: 100vw;
  max-width: 100vw;
  background-color: ${scrimColor};
  z-index: 15;
`

export const PortalSidebox = styled.aside`
  position: fixed;
  overflow: hidden;
  top: 0;
  ${propOrElse(["side"], "left")}: 0;
  bottom: 0;
  height: 100vh;
  width: 50vw;
  background-color: ${getColor("mainBackground")};
  border-${innerEdge}: 1px solid ${getColor("border")};
  box-shadow: ${sidePanelShadow};
`

export const InfoBox = styled.div`
  display: flex;
  width: 50%;
  background-color: ${getColor("primary")};
  box-shadow: inset 0px ${shadowOffset}px 68px rgba(0, 0, 0, 0.288);
`
