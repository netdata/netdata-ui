import React, { SyntheticEvent, FC } from "react"
import { StyledButton } from "./styled"
import { Icon } from "../icon"
import { LoaderIcon } from "../icon/components"

export type ButtonType = "default" | "hollow" | "borderless"

export interface ButtonProps {
  id?: string
  className?: string
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void
  danger?: boolean
  warning?: boolean
  type?: ButtonType | undefined
  flavour?: ButtonType
  disabled?: boolean
  small?: boolean
}

export interface ButtonWrapperProps extends ButtonProps {
  label?: string | JSX.Element
  icon?: any
  isLoading?: boolean
  loadingLabel?: string | JSX.Element
  loadingIcon?: any
}

export const Button: FC<ButtonWrapperProps> = ({
  label,
  icon,
  type,
  flavour,
  isLoading,
  loadingLabel,
  loadingIcon,
  ...rest
}: ButtonWrapperProps) => (
  <StyledButton flavour={type || flavour} hasLabel={!!label} {...rest}>
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
