import React from "react"
import { SidebarBox, ComponentBox, InfoBox } from "./styled"

export const Sidebar = ({ info, children, className, right = false }) => (
  <ComponentBox isRight={right}>
    <SidebarBox className={className} shadowSide={right}>
      {children}
    </SidebarBox>
    <InfoBox>{info}</InfoBox>
  </ComponentBox>
)
