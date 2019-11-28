import React, { SyntheticEvent, FC } from "react"
import { StyledButton, StyledCircularProgress } from "./styled"
import { DEFAULT } from "./constants"

type ButtonType = "default" | "hollow" | "borderless"

export interface ButtonProps {
  id?: string
  ref?: React.MutableRefObject<HTMLInputElement>
  className?: string
  label?: string | JSX.Element
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
  type = DEFAULT,
  disabled = false,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      label={label}
      onClick={onClick}
      icon={isLoading ? <StyledCircularProgress /> : icon}
      type={type}
      disabled={disabled}
      {...props}
    />
  )
}
