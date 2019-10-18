import React, { FC, useState, useEffect } from "react"
import { Portal } from "react-portal"
import { PortalSidebox } from "./styled"

const ESCAPE_KEY = 27

export const PortalSidebar: FC<PortalSidebarProps> = ({
  isOpen = true,
  children,
  closeOnEsc = false,
  onClose = () => {},
  right = false,
}: PortalSidebarProps) => {
  const [isOpenState, setOpen] = useState(isOpen)

  useEffect(() => {
    setOpen(isOpen)
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.keyCode === ESCAPE_KEY && closeOnEsc) {
        setOpen(false)
        onClose()
      }
    })
    return () => {
      document.removeEventListener("keydown", (event: KeyboardEvent) => {
        if (event.keyCode === ESCAPE_KEY && closeOnEsc) {
          setOpen(false)
          onClose()
        }
      })
    }
  }, [isOpen])

  return isOpenState ? (
    <Portal>
      <PortalSidebox shadowSide={right} side={right ? "right" : "left"}>
        {children}
      </PortalSidebox>
    </Portal>
  ) : null
}
