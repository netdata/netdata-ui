import { FC } from "react"
import { Props } from "react-select"
import { DropdownSelectionStyle } from "../drops/dropdownStyles"

export interface SelectProps extends Props {
  "data-ga"?: string
  "data-testid"?: string
  estimatedOptionHeight?: number
  selectionStyle?: DropdownSelectionStyle
}

declare const Select: FC<SelectProps>

export { Select }

export default Select
