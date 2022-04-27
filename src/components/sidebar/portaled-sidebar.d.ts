import { ExoticComponent, FC, ReactNode } from "react"

export interface PortalSidebarProps {
  children: ReactNode
  className?: string
  closeOnEsc?: boolean
  closeOnOverlayClick?: boolean
  "data-testid"?: string
  onClose?: () => {}
  right?: boolean
  Wrapper: ExoticComponent<{ children?: ReactNode }> | undefined
  [s: string]: any
}

declare const PortalSidebar: FC<PortalSidebarProps>

export { PortalSidebar }

export default PortalSidebar
