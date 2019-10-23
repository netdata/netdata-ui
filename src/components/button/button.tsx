import React, { SyntheticEvent } from "react"
import { StyledButton, StyledCircularProgress } from "./styled"

export enum ButtonType {
  default = "default",
  noFill = "noFill",
}

export interface ButtonProps {
  id?: string
  ref?: React.MutableRefObject<HTMLInputElement>
  className?: string
  label?: string
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void
  icon?: any
  isLoading?: boolean
  type?: ButtonType
  disabled?: boolean
}

export const Button = ({
  label,
  onClick = () => {},
  icon = null,
  isLoading = false,
  type = ButtonType.default,
  disabled = false,
}: ButtonProps) => {
  return (
    <StyledButton
      onClick={onClick}
      icon={isLoading ? <StyledCircularProgress /> : icon}
      type={type}
      disabled={disabled}
    >
      {label}
    </StyledButton>
  )
}
