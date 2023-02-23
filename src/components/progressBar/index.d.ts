import { FC } from "react"

export interface Value {
  color?: string
  width?: string
  [key: string]: any
}

export interface ProgressBarProps {
  background?: string
  className?: string
  color?: string
  "data-testid"?: string
  containerWidth?: string
  height?: number
  value?: Value[]
  width?: string
  [s: string]: any
}

declare const ProgressBar: FC<ProgressBarProps>

export { ProgressBar }

export default ProgressBar
