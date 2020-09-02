import React, { FC, Fragment, useEffect, ReactNode } from "react"
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
  Wrapper?: string | React.ComponentType<any>
}

export const PortalSidebar: FC<PortalSidebarProps> = ({
  children,
  className,
  closeOnEsc = false,
  closeOnOverlayClick = false,
  onClose = () => {},
  right = false,
  Wrapper = Fragment,
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
      <DisabledOverlay onClick={handleOverlayClick} />
      <Wrapper>
        <PortalSidebox className={className} shadowSide={right} side={right ? "right" : "left"}>
          {children}
        </PortalSidebox>
      </Wrapper>
    </Portal>
  )
}
