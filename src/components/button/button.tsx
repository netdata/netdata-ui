import React, { SyntheticEvent } from "react"
import { StyledButton, StyledCircularProgress } from "./styled"

export interface ButtonProps {
  label?: string
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void
  icon?: any
  isLoading?: boolean
}

export const Button = ({ label = "label", onClick = () => {}, icon, isLoading }: ButtonProps) => {
  return (
    <StyledButton
      label={label.toUpperCase()}
      onClick={onClick}
      icon={isLoading ? <StyledCircularProgress /> : icon}
    />
  )
}
