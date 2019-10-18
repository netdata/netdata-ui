type NodeT = import("react").ReactNode

interface SidebarProps {
  info?: NodeT
  right?: boolean
  children?: NodeT
}

interface PortalSidebarProps<T = any> {
  isOpen?: boolean
  closeOnEsc?: boolean
  onClose?: (args?: T) => void
  right?: boolean
  children?: NodeT
}
