import React, { FC } from "react"
import { Portal } from "react-portal"
import { PortalSidebox } from "./styled"

export const PortalSidebar: FC<SidebarProps> = ({ children, right = false }: SidebarProps) => (
  <Portal>
    <PortalSidebox shadowXOffset={right ? -2 : 2} side={right ? "right" : "left"}>
      {children}
    </PortalSidebox>
  </Portal>
)
