import {
  ChangeEvent,
  ComponentPropsWithRef,
  CSSProperties,
  FC,
  FocusEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  MutableRefObject,
  ReactNode,
} from "react"
import { AlignSelfProps, MarginProps } from "@/mixins/types"
import { FlexProps } from "@/components/templates/flex"

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

interface InputTypographyProps {
  monospace?: boolean
  fontSize?: number | string
  fontWeight?: number | string
  lineHeight?: number | string
}

export interface InputProps extends InputTypographyProps {
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
  // "tiny" and "compact" are 24px; "small" and "large" (the default) are 30px.
  size?: "tiny" | "compact" | "small" | "large"
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

export type TextInputProps = InputProps &
  ComponentProps &
  Omit<FlexProps, keyof InputProps | keyof ComponentProps> &
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    keyof InputProps | keyof ComponentProps | keyof FlexProps
  > & {
    containerStyles?: FlexProps
    inputContainerStyles?: FlexProps
    hideErrorMessage?: boolean
    _hover?: Partial<FlexProps> & Record<string, unknown>
  }

type InputControlStyleProps = Omit<FlexProps, "as"> &
  InputTypographyProps & {
    size?: InputProps["size"]
    error?: boolean | string
    hasValue?: boolean
    textAlign?: CSSProperties["textAlign"]
    placeholderProps?: Record<string, string | number>
    _hover?: Partial<FlexProps> & Record<string, unknown>
  }

export type InputControlProps =
  | (InputControlStyleProps &
      Omit<ComponentPropsWithRef<"input">, keyof FlexProps | "size"> & { as?: "input" })
  | (Omit<InputControlStyleProps, "wrap"> &
      Omit<ComponentPropsWithRef<"textarea">, Exclude<keyof FlexProps, "wrap"> | "size"> & {
        as: "textarea"
      })

declare const TextInput: FC<TextInputProps>
declare const InputControl: FC<InputControlProps>

export { InputControl, TextInput }

export default TextInput
