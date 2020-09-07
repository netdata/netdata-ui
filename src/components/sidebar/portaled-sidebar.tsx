import React, { FC, Fragment, useEffect, ReactNode, useState, useRef } from "react"
import { Portal } from "react-portal"
import { useMount } from "react-use"
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
  const sidebarRef = useRef<HTMLElement>(null)
  const [overlayZIndex, setOverlayZIndex] = useState("auto")

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

  useMount(() => {
    if (sidebarRef?.current) {
      const element = sidebarRef.current as HTMLElement
      const style = window.getComputedStyle(element)
      const zIndex = style.getPropertyValue("z-index") || "auto"
      setOverlayZIndex(zIndex)
    }
  })

  return (
    <Portal>
      <DisabledOverlay overlayZIndex={overlayZIndex} onClick={handleOverlayClick} />
      <Wrapper>
        <PortalSidebox
          ref={sidebarRef}
          className={className}
          shadowSide={right}
          side={right ? "right" : "left"}
        >
          {children}
        </PortalSidebox>
      </Wrapper>
    </Portal>
  )
}
