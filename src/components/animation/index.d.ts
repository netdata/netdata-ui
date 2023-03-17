import { FC, ReactNode } from "react"

export interface AnimationProps {
  open?: boolean
  duration?: number
  persist?: boolean
  children: ReactNode | (() => ReactNode)
  [rest: string]: any
}

declare const Animation: FC<AnimationProps & JSX.IntrinsicElements["div"]>

export { Animation }

export default Animation
