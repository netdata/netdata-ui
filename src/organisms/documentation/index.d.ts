import { ReactNode } from "react"

export interface DocumentationProps {
  app?: "cloud" | "agent"
  children: (toggle: () => void, isOpen: boolean) => ReactNode
}

declare const Documentation: React.FC<DocumentationProps>

export default Documentation
