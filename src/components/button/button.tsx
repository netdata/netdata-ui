import React, { SyntheticEvent } from "react"
import { StyledButton, StyledCircularProgress } from "./styled"

export enum ButtonType {
  default = "default",
  bordered = "bordered",
  disabled = "disabled",
  hollow = "hollow",
}

export interface ButtonProps {
  label?: string
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void
  icon?: any
  isLoading?: boolean
  type?: ButtonType
}

export const Button = ({
  label = "label",
  onClick = () => {},
  icon,
  isLoading,
  type = ButtonType.default,
}: ButtonProps) => {
  return (
    <StyledButton
      label={label}
      onClick={onClick}
      icon={isLoading ? <StyledCircularProgress /> : icon}
      type={type}
    />
  )
}
