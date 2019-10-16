import React, { SyntheticEvent } from "react"
import { Button } from "@rmwc/button"
import "@material/button/dist/mdc.button.css"
import { CircularProgress } from "@rmwc/circular-progress"
import "@rmwc/circular-progress/circular-progress.css"

export interface MDXButtonProps {
  label?: string
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void
  icon?: any
  isLoading?: boolean
}
