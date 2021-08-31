import { MarginProps, AlignSelfProps } from "../../mixins/types"

export interface RadioButtonProps extends MarginProps, AlignSelfProps {
  label?: React.ReactNode
  checked?: boolean
  disabled?: boolean
  name?: string
  iconProps?: {
    [key: string]: any
  }
  children?: React.ReactNode
}

declare const RadioButton: React.FC<RadioButtonProps & JSX.IntrinsicElements["input"]>

export { RadioButton }

export default RadioButton
