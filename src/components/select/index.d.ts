import { FC, ReactNode } from "react"
import { Props } from "react-select"
import { DropdownSelectionStyle } from "../drops/dropdownStyles"

export interface SelectProps extends Props {
  "data-ga"?: string
  "data-testid"?: string
  estimatedOptionHeight?: number
  selectionStyle?: DropdownSelectionStyle
  appearance?: "surface"
  menuFooter?: ReactNode
}

export declare const selectSurfaceStyles: (theme: any) => NonNullable<Props["styles"]>

declare const Select: FC<SelectProps>

export { Select }

export default Select
