import { FC, KeyboardEvent, FocusEvent, Ref, SyntheticEvent } from "react"
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

export interface ButtonGroupProps {
  items?: Array<RadioButtonGroupItem>
  checked?: string | number
  onChange?: (value: string | number) => void
  variant?: "default" | "segmented"
}

export interface RadioButtonGroupItem {
  label: string
  value: string | number
}

export interface ButtonGroupWrapperProps
  extends ButtonGroupProps,
    MarginProps,
    PaddingProps,
    AlignSelfProps {}

declare const Button: FC<ButtonWrapperProps>
declare const IconButton: FC<IconButtonProps>
declare const ButtonGroup: FC<ButtonGroupWrapperProps>

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
