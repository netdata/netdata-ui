import React, { SyntheticEvent, FC } from "react"
import { StyledButton } from "./styled"
import { Icon } from "../icon"

export type ButtonType = "default" | "hollow" | "borderless"

export interface ButtonProps {
  id?: string
  className?: string
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void
  danger?: boolean
  warning?: boolean
  type?: ButtonType | undefined
  flavor?: ButtonType
  disabled?: boolean
  small?: boolean
}

export interface ButtonWrapperProps extends ButtonProps {
  label?: string | JSX.Element
  icon?: any
  isLoading?: boolean
  loadingLabel?: string | JSX.Element
}

export const Button: FC<ButtonWrapperProps> = ({
  label,
  icon,
  type,
  flavor,
  isLoading,
  loadingLabel,
  ...rest
}: ButtonWrapperProps) => (
  <StyledButton flavor={type || flavor} hasLabel={!!label} {...rest}>
    {icon && (
      <Icon
        className="button-icon"
        title={isLoading ? "loading" : icon}
        name={isLoading ? icon : icon}
      />
    )}
    {label && <span>{(isLoading && loadingLabel) || label}</span>}
  </StyledButton>
)

Button.defaultProps = {
  onClick: () => {},
  icon: null,
}
