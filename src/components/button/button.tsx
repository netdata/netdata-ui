import React, { SyntheticEvent } from "react"
import { Button } from "@rmwc/button"
import { CircularProgress } from "@rmwc/circular-progress"

export interface MDXButtonProps {
  label?: string
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void
  icon?: any
  isLoading?: boolean
}

export const MDXButton = ({
  label = "default",
  onClick = () => {},
  icon,
  isLoading,
}: MDXButtonProps) => (
  <>
    <Button
      label={label}
      onClick={onClick}
      unelevated
      icon={isLoading ? <CircularProgress /> : icon}
    />
  </>
)
