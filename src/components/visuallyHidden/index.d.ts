import { HTMLAttributes, FC, Ref } from "react"

export interface VisuallyHiddenProps extends HTMLAttributes<HTMLElement> {
  as?: any
  ref?: Ref<HTMLElement>
  [key: string]: any
}

declare const VisuallyHidden: FC<VisuallyHiddenProps>
export default VisuallyHidden
