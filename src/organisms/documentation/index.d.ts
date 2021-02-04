import { ReactNode } from "react"

export interface DocumentationProps {
  app?: "cloud" | "agent"
  onClickOut?: () => void
  onCloseClick?: () => void
  onVisitDocumentClick?: () => void
  onOpenIssueClick?: () => void
  onOpenBugClick?: () => void
  onContributeClick?: () => void
  onSupportClick?: () => void
  children: (toggle: () => void, isOpen: boolean) => ReactNode
}

declare const Documentation: React.FC<DocumentationProps>

export default Documentation
