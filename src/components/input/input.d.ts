import { ChangeEvent, FC, FocusEvent, KeyboardEvent, MutableRefObject, ReactNode } from "react"
import { AlignSelfProps, MarginProps } from "@/mixins/types"

export type CallBackRef = (input: any) => void
export type InstantFeedback = "all" | "positiveFirst"

export interface ComponentProps extends MarginProps, AlignSelfProps {
  hint?: string
  error?: boolean | string
  success?: boolean | string
  touched?: boolean
  isDirty?: boolean
  instantFeedback?: InstantFeedback
  className?: string
  fieldIndicator?: string | ReactNode
  metaShrinked?: boolean
  label?: string
  handleMetaDisplay?: (metaOptions: MetaOptions) => boolean
}

export interface InputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: FocusEvent) => void
  onBlur?: (e: FocusEvent) => void
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
  value: string
  inputRef?: MutableRefObject<HTMLInputElement | null> | CallBackRef
  disabled?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
  name?: string
  placeholder?: string
  autoFocus?: boolean
}

export interface MetaOptions {
  error?: boolean | string
  success?: boolean | string
  touched?: boolean
  isDirty?: boolean
  instantFeedback?: InstantFeedback
  prevValue: string | undefined
  value: string
  focused?: boolean
}

export interface TextInputProps extends InputProps, ComponentProps {}

declare const TextInput: FC<TextInputProps>

export { TextInput }

export default TextInput
