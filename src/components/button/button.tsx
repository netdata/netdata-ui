import React from "react"
import { Button } from "@rmwc/button"
import { CircularProgress } from "@rmwc/circular-progress"
import "@rmwc/circular-progress/circular-progress.css"
import { MDXButtonProps } from "."

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
