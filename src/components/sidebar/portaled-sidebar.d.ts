import { FC, ReactNode } from "react"

export interface PortalSidebarProps {
  className?: string
  closeOnEsc?: boolean
  closeOnOverlayClick?: boolean
  "data-testid"?: string
  onClose?: () => {}
  right?: boolean
  Wrapper: ReactNode
  [s: string]: any
}

declare const PortalSidebar: FC<PortalSidebarProps>

export { PortalSidebar }

export default PortalSidebar
