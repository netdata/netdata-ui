import {
  ElementType,
  FC,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SyntheticEvent,
} from "react"
import { FlexProps } from "@/components/templates/flex"

export type CheckboxProps = FlexProps &
  Omit<HTMLAttributes<HTMLElement>, keyof FlexProps | "onChange" | "onClick"> & {
    checked?: boolean
    disabled?: boolean
    indeterminate?: boolean
    variant?: "default" | "filled"
    label?: ReactNode
    Label?: ElementType
    labelPosition?: "left" | "right"
    labelProps?: Record<string, unknown>
    checkboxProps?: Record<string, unknown>
    iconProps?: Record<string, unknown>
    inputProps?: Omit<
      InputHTMLAttributes<HTMLInputElement>,
      "checked" | "disabled" | "readOnly"
    > & {
      "data-testid"?: string
    }
    onChange?: (checked: boolean, event: SyntheticEvent<HTMLElement>) => void
  }

declare const Checkbox: FC<CheckboxProps>

export { Checkbox }
