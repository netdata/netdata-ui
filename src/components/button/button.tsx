import React, { SyntheticEvent, FC } from "react"
import { StyledButton } from "./styled"
import { Icon } from "src/components/icon"
import { LoaderIcon } from "src/components/icon/components"
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
  [s: string]: any
}

export interface ButtonWrapperProps extends ButtonProps, MarginProps, PaddingProps, AlignSelfProps {
  label?: string | JSX.Element
  icon?: any
  isLoading?: boolean
  loadingLabel?: string | JSX.Element
  loadingIcon?: any
}

export const Button: FC<ButtonWrapperProps> = ({
  label,
  icon,
  flavour,
  isLoading,
  loadingLabel,
  loadingIcon,
  onClick,
  ...rest
}: ButtonWrapperProps) => (
  <StyledButton
    flavour={flavour}
    hasLabel={!!label}
    onClick={isLoading ? undefined : onClick}
    {...rest}
  >
    {isLoading && !loadingIcon && !loadingIcon && <LoaderIcon className="button-icon" />}
    {icon && !isLoading && !loadingIcon && (
      <Icon className="button-icon" title={isLoading ? loadingIcon : icon} name={icon} />
    )}
    {label && <span>{(isLoading && loadingLabel) || label}</span>}
  </StyledButton>
)

Button.defaultProps = {
  onClick: () => {},
  icon: null,
  loadingIcon: null,
}
