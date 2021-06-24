import { ReactNode } from "react"

export interface NewsProps {
  app?: "cloud" | "agent"
  onCloseClick?: () => void
  children: (toggle: () => void, isOpen: boolean, upToDate: boolean) => ReactNode
}

declare const News: React.FC<NewsProps>

export default News
