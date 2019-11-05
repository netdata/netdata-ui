import React, { SyntheticEvent, FC } from "react"
import { StyledButton, StyledCircularProgress } from "./styled"
import { Icon } from "../icon"

export enum ButtonType {
  default = "default",
  noFill = "noFill",
  borderless = "borderless",
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

export const Button: FC<ButtonProps> = ({
  label,
  onClick = () => {},
  icon = null,
  isLoading = false,
  type = ButtonType.default,
  disabled = false,
}: ButtonProps) => {
  return (
    <StyledButton
      label={label}
      onClick={onClick}
      // isLoading={isLoading}
      icon={isLoading ? <StyledCircularProgress /> : icon}
      type={type}
      disabled={disabled}
    />
  )
}
