import React, { SyntheticEvent } from "react"
import { Button } from "@rmwc/button"
import "@material/button/dist/mdc.button.css"
import { CircularProgress } from "@rmwc/circular-progress"
import "@rmwc/circular-progress/circular-progress.css"
import styled from "styled-components"

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
