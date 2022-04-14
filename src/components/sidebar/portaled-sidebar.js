import React, { Fragment, useEffect, useState, useRef } from "react"
import { Portal } from "react-portal"
import { useMount } from "react-use"
import { PortalSidebox, DisabledOverlay } from "./styled"

const ESCAPE_KEY = 27

export const PortalSidebar = ({
  children,
  className,
  closeOnEsc = false,
  closeOnOverlayClick = false,
  onClose = () => {},
  right = false,
  Wrapper = Fragment,
  ...rest
}) => {
  const sidebarRef = useRef(null)
  const [overlayZIndex, setOverlayZIndex] = useState("auto")

  useEffect(() => {
    const evHandler = event => {
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
      const element = sidebarRef.current
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
          {...rest}
        >
          {children}
        </PortalSidebox>
      </Wrapper>
    </Portal>
  )
}
