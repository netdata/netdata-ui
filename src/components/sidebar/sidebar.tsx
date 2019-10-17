import React, { FC } from "react"
import { SidebarBox, ComponentBox, InfoBox } from "./styled"

export const Sidebar: FC<SidebarProps> = ({ info, children, right = false }: SidebarProps) => (
  <ComponentBox side={right ? "row-reverse" : "row"}>
    <SidebarBox shadowXOffset={right ? -2 : 2}>{children}</SidebarBox>
    <InfoBox>{info}</InfoBox>
  </ComponentBox>
)
