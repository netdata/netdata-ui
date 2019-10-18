import styled from "styled-components"
import { propOrElse, getColor } from "../../theme/utils"

const LEFT = 2
const RIGHT = -2

export const ComponentBox = styled.div<{ side: "row" | "row-reverse" }>`
  display: flex;
  top: 0;
  flex-direction: ${propOrElse(["side"], "row")};
  bottom: 0;
  height: 100vh;
  width: 100vw;
`

export const SidebarBox = styled.aside<{ shadowSide: boolean }>`
  display: "flex";
  top: 0;
  bottom: 0;
  height: 100%;
  width: 50%;
  box-shadow: 0px ${propOrElse(["shadowSide"], false) ? LEFT : RIGHT}px 68px rgba(0, 0, 0, 0.288);
`
export const PortalSidebox = styled.aside<{
  shadowSide: boolean
  side: "left" | "right"
}>`
  position: absolute;
  display: "flex";
  top: 0;
  ${propOrElse(["side"], "left")}: 0;
  bottom: 0;
  height: 100%;
  width: 50%;
  box-shadow: 0px ${propOrElse(["shadowSide"], false) ? LEFT : RIGHT}px 68px rgba(0, 0, 0, 0.288);
`

export const InfoBox = styled.div`
  display: flex;
  width: 50%;
  background-color: ${getColor(["green", "greenHaze"])};
`
