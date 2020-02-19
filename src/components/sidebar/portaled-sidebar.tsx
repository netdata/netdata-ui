import React, { FC, useEffect, ReactNode } from "react"
import { Portal } from "react-portal"
import { PortalSidebox, DisabledOverlay } from "./styled"

const ESCAPE_KEY = 27

interface PortalSidebarProps<T = any> {
  closeOnEsc?: boolean
  onClose?: (args?: T) => void
  right?: boolean
  children?: ReactNode
  className?: string
}

export const PortalSidebar: FC<PortalSidebarProps> = ({
  children,
  className,
  closeOnEsc = false,
  onClose = () => {},
  right = false,
}: PortalSidebarProps) => {
  useEffect(() => {
    const evHandler = (event: KeyboardEvent) => {
      if (event.keyCode === ESCAPE_KEY && closeOnEsc) {
        onClose()
      }
    }
    document.addEventListener("keydown", evHandler)
    return () => {
      document.removeEventListener("keydown", evHandler)
    }
  }, [closeOnEsc, onClose])

  return (
    <Portal>
      <DisabledOverlay />
      <PortalSidebox className={className} shadowSide={right} side={right ? "right" : "left"}>
        {children}
      </PortalSidebox>
    </Portal>
  )
}
