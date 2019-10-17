import React, { SyntheticEvent } from "react"
import { CircularProgress } from "@rmwc/circular-progress"
import { StyledButton } from "./styled"

export interface ButtonProps {
  label?: string
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void
  icon?: any
  isLoading?: boolean
}

export const Button = ({ label = "default", onClick = () => {}, icon, isLoading }: ButtonProps) => (
  <>
    <StyledButton
      label={label}
      onClick={onClick}
      unelevated
      icon={isLoading ? <CircularProgress /> : icon}
    />
  </>
)
