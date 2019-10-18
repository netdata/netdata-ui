import React, { SyntheticEvent } from "react"
import { StyledButton, StyledCircularProgress } from "./styled"

export enum ButtonType {
  default = "default",
  noFill = "noFill",
}

export interface ButtonProps {
  label?: string
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void
  icon?: any
  isLoading?: boolean
  type?: ButtonType
  disabled?: boolean
}

export const Button = ({
  label = "label",
  onClick = () => {},
  icon,
  isLoading = false,
  type = ButtonType.default,
  disabled = false,
}: ButtonProps) => {
  return (
    <StyledButton
      label={label}
      onClick={onClick}
      icon={isLoading ? <StyledCircularProgress /> : icon}
      type={type}
      disabled={disabled}
    />
  )
}
