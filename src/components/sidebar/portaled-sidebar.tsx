import React, { FC, useEffect, ReactNode } from "react"
import { Portal } from "react-portal"
import { PortalSidebox, DisabledOverlay } from "./styled"

const ESCAPE_KEY = 27

interface PortalSidebarProps<T = any> {
  closeOnEsc?: boolean
  onClose?: (args?: T) => void
  closeOnOverlayClick?: boolean
  right?: boolean
  children?: ReactNode
  className?: string
}

export const PortalSidebar: FC<PortalSidebarProps> = ({
  children,
  className,
  closeOnEsc = false,
  closeOnOverlayClick = false,
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

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose()
    }
  }

  return (
    <Portal>
      <DisabledOverlay className={className} onClick={handleOverlayClick} />
      <PortalSidebox className={className} shadowSide={right} side={right ? "right" : "left"}>
        {children}
      </PortalSidebox>
    </Portal>
  )
}
