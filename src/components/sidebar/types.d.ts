type NodeT = import("react").ReactNode

interface SidebarProps {
  info?: NodeT
  right?: boolean
  children?: NodeT
}
