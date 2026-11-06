import { FC, KeyboardEvent, FocusEvent, Ref, SyntheticEvent, ReactNode } from "react"
import { FlexProps } from "@/components/templates/flex"
import { MarginProps, PaddingProps, AlignSelfProps } from "@/mixins/types"

export type ButtonFlavour = "default" | "hollow" | "borderless" | "link"
export type ThemeType = "light" | "dark"

export interface ButtonProps {
  id?: string
  className?: string
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void
  onMouseDown?: (e: SyntheticEvent<HTMLButtonElement>) => void
  onMouseEnter?: (e: SyntheticEvent<HTMLButtonElement>) => void
  onMouseLeave?: (e: SyntheticEvent<HTMLButtonElement>) => void
  onMouseMove?: (e: SyntheticEvent<HTMLButtonElement>) => void
  onMouseOut?: (e: SyntheticEvent<HTMLButtonElement>) => void
  onMouseOver?: (e: SyntheticEvent<HTMLButtonElement>) => void
  onMouseUp?: (e: SyntheticEvent<HTMLButtonElement>) => void
  danger?: boolean
  warning?: boolean
  type?: string
  flavour?: ButtonFlavour
  disabled?: boolean
  small?: boolean
  large?: boolean
  compact?: boolean
  neutral?: boolean
  uppercase?: boolean
  themeType?: ThemeType | undefined
  active?: boolean
  iconSize?: string
  [s: string]: any
}

export interface ButtonWrapperProps extends ButtonProps, MarginProps, PaddingProps, AlignSelfProps {
  label?: string | JSX.Element
  icon?: any
  isLoading?: boolean
  loadingLabel?: string | JSX.Element
  loadingIcon?: any
  iconColor?: string
  strong?: boolean
}

type IconButtonProps = Pick<
  ButtonWrapperProps,
  "iconColor" | "flavour" | "icon" | "disabled" | "onClick" | "iconSize" | "large" | "compact"
> & { width?: string; height?: string; tooltip?: string; focusableWhenDisabled?: boolean }

export type ButtonGroupValue = string | number | boolean

export interface SegmentedButtonProps extends ButtonProps {
  height?: number | string
  monospace?: boolean
}

export interface ButtonGroupProps<
  Value extends ButtonGroupValue = ButtonGroupValue,
  Multi extends boolean = false,
> {
  items?: Array<RadioButtonGroupItem<Value>>
  checked?: string | number
  value?: (Multi extends true ? Value[] : Value) | null
  isMulti?: Multi
  onChange?: (value: Multi extends true ? Value[] : Value) => void
  appearance?: "raised"
  compact?: boolean
  buttonProps?: SegmentedButtonProps
  variant?: "default" | "segmented"
}

export interface RadioButtonGroupItem<Value extends ButtonGroupValue = ButtonGroupValue> {
  label: ReactNode
  value: Value
  title?: string
  buttonProps?: SegmentedButtonProps
}

export interface ButtonGroupWrapperProps<
  Value extends ButtonGroupValue = ButtonGroupValue,
  Multi extends boolean = false,
>
  extends ButtonGroupProps<Value, Multi>, FlexProps {}

declare const Button: FC<ButtonWrapperProps>
declare const IconButton: FC<IconButtonProps>
declare function ButtonGroup<Value extends ButtonGroupValue, Multi extends boolean = false>(
  props: ButtonGroupWrapperProps<Value, Multi>
): ReactNode

export interface RovingItemProps {
  tabIndex: number
  ref: (node: HTMLElement | null) => void
  onFocus: (event: FocusEvent<HTMLElement>) => void
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void
}

export interface UseRovingFocusOptions {
  count: number
  orientation?: "horizontal" | "vertical"
  initialIndex?: number
}

declare function useRovingFocus(options: UseRovingFocusOptions): {
  activeIndex: number
  setActiveIndex: (index: number) => void
  getItemProps: (
    index: number,
    own?: {
      onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void
      onFocus?: (event: FocusEvent<HTMLElement>) => void
      ref?: Ref<HTMLElement>
    }
  ) => RovingItemProps
}

export { Button, IconButton, ButtonGroup, useRovingFocus }

export default Button
