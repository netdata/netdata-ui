type NodeT = import("react").ReactNode

interface SidebarProps {
  info?: NodeT
  right?: boolean
  children?: NodeT
}

interface PortalSidebarProps<T = any> {
  closeOnEsc?: boolean
  onClose?: (args?: T) => void
  right?: boolean
  children?: NodeT
}
