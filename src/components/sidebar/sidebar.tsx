import React, { FC, ReactNode } from "react"
import { SidebarBox, ComponentBox, InfoBox, DisabledOverlay } from "./styled"

export interface SidebarProps {
  info?: ReactNode
  right?: boolean
  children?: ReactNode
  className?: string
}

export const Sidebar: FC<SidebarProps> = ({
  info,
  children,
  className,
  right = false,
}: SidebarProps) => (
  <ComponentBox isRight={right}>
    <DisabledOverlay />
    <SidebarBox className={className} shadowSide={right}>
      {children}
    </SidebarBox>
    <InfoBox>{info}</InfoBox>
  </ComponentBox>
)
