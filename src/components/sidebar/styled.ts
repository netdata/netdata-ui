import styled from "styled-components"
import { propOrElse, getColor } from "../../theme/utils"
import { ComponentBoxT, SidebarBoxT, PortalSidebarboxT } from "./types"

const LEFT = 2
const RIGHT = -2

export const ComponentBox = styled.div<ComponentBoxT>`
  display: flex;
  flex-direction: ${({ isRight }) => (isRight ? "row-reverse" : "row")};
  top: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
`

export const SidebarBox = styled.aside<SidebarBoxT>`
  overflow: hidden;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 50%;
`
export const PortalSidebox = styled.aside<PortalSidebarboxT>`
  position: absolute;
  overflow: hidden;
  top: 0;
  ${propOrElse<PortalSidebarboxT, string>(["side"], "left")}: 0;
  bottom: 0;
  height: 100vh;
  width: 50vw;
  box-shadow: 0px ${propOrElse<PortalSidebarboxT, boolean>(["shadowSide"], true) ? LEFT : RIGHT}px
    68px rgba(0, 0, 0, 0.288);
`

export const InfoBox = styled.div`
  display: flex;
  width: 50%;
  background-color: ${getColor(["green", "greenHaze"])};
  box-shadow: inset 0px ${propOrElse<SidebarBoxT, boolean>(["shadowSide"], true) ? LEFT : RIGHT}px
    68px rgba(0, 0, 0, 0.288);
`
