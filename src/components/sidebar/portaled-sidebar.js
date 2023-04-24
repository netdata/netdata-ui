import React, { Fragment, useEffect } from "react"
import { Portal } from "react-portal"
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

  return (
    <Portal>
      <DisabledOverlay onClick={handleOverlayClick} />
      <Wrapper>
        <PortalSidebox
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
