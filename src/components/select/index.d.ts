import { FC } from "react"
import { Props } from "react-select"

export interface SelectProps extends Props {
  "data-ga"?: string
  "data-testid"?: string
  estimatedOptionHeight?: number
}

declare const Select: FC<SelectProps>

export { Select }

export default Select
