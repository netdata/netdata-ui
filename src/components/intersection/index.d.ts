import { ReactNode } from "react"
import { FlexProps } from "../templates/flex"

export interface IntersectionProps extends FlexProps {
  root: object
  rootMargin: string
  threshold: number
  fallback: ReactNode | (() => ReactNode)
  children: ReactNode | (() => ReactNode)
  [key: string]: any
}

declare const Intersection: React.FC<IntersectionProps & JSX.IntrinsicElements["div"]>

export { Intersection }

export default Intersection
