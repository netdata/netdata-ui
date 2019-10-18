import React from "react"
import styled, { css } from "styled-components"
import { Button } from "@rmwc/button"
import { CircularProgress } from "@rmwc/circular-progress"
// import "@rmwc/circular-progress/circular-progress.css"
import { getColor } from "../../theme/utils"

export const StyledButton = styled(({ ...otherProps }) => <Button {...otherProps} />)`
  ${props =>
    props.isLoading
      ? css`
          background: ${getColor(["green", "malachite"])};
          border-radius: 3px;
          border-color: ${getColor(["green", "malachite"])};
          text-color: 
          width: 128px;
          height: 40px;
          focus: {outline:0;}
        `
      : css`
          background: ${getColor(["green", "greenHaze"])};
          border-radius: 3px;
          border-color: ${getColor(["green", "malachite"])};
          width: 128px;
          height: 40px;
          focus: {
            outline: 0;
          }
        `};
`

export const StyledCircularProgress = styled(({ ...otherProps }) => (
  <CircularProgress {...otherProps} />
))`
  ${() => `

  `};
`

// background: ${getColor(["gray", "limedSpruce"])};
// size="small"
