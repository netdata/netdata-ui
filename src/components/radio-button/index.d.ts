import { MarginProps } from "../../mixins/types"

export interface RadioButtonProps extends MarginProps {
  label?: React.ReactNode
  checked?: boolean
  disabled?: boolean
  name?: string
  children?: React.ReactNode
}

declare const RadioButton: React.FC<RadioButtonProps & JSX.IntrinsicElements["input"]>

export { RadioButton }
