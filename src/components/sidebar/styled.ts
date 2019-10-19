import styled from "styled-components"
import { propOrElse, getColor } from "../../theme/utils"

const LEFT = 2
const RIGHT = -2

export const ComponentBox = styled.div<ComponentBox>`
  display: flex;
  flex-direction: ${({ isRight }: ComponentBox) => (isRight ? "row-reverse" : "row")};
  top: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
`

export const SidebarBox = styled.aside<SidebarBox>`
  display: "flex";
  overflow: hidden;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 50%;
`
export const PortalSidebox = styled.aside<PortalSidebarbox>`
  position: absolute;
  display: "flex";
  overflow: hidden;
  top: 0;
  ${propOrElse<PortalSidebarbox, string>(["side"], "left")}: 0;
  bottom: 0;
  height: 100%;
  width: 50%;
  box-shadow: 0px ${propOrElse<PortalSidebarbox, boolean>(["shadowSide"], true) ? LEFT : RIGHT}px
    68px rgba(0, 0, 0, 0.288);
`

export const InfoBox = styled.div`
  display: flex;
  width: 50%;
  background-color: ${getColor(["green", "greenHaze"])};
  box-shadow: inset 0px ${propOrElse<SidebarBox, boolean>(["shadowSide"], true) ? LEFT : RIGHT}px
    68px rgba(0, 0, 0, 0.288);
`
