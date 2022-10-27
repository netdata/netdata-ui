import { FC, SyntheticEvent } from "react"
import { MarginProps, PaddingProps, AlignSelfProps } from "src/mixins/types"

export type ButtonFlavour = "default" | "hollow" | "borderless"
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
}

type IconButtonProps = Pick<
  ButtonWrapperProps,
  "iconColor" | "flavour" | "icon" | "disabled" | "onClick" | "iconSize"
> & { width?: string; height?: string; tooltip?: string }

declare const Button: FC<ButtonWrapperProps>
declare const IconButton: FC<IconButtonProps>

export { Button, IconButton }

export default Button
