type Props<T> = import("react").Props<T>
type NodeT = import("react").ReactNode

interface SidebarProps {
  info?: NodeT
  right?: boolean
  children?: NodeT
}
