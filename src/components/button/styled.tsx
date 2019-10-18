import React from "react"
import styled, { css } from "styled-components"
import { Button } from "@rmwc/button"
import { CircularProgress } from "@rmwc/circular-progress"
// import "@rmwc/circular-progress/circular-progress.css"
import { getColor } from "../../theme/utils"
import { ButtonType } from "./button"

export const StyledButton = styled(({ ...otherProps }) => <Button {...otherProps} />)`
  ${props => {
    switch (props.type) {
      case ButtonType.disabled:
        return css`
          opacity: 0.6;
          cursor: not-allowed;
          background: ${getColor(["green", "greenHaze"])};
          border-radius: 3px;
          border-color: ${getColor(["green", "greenHaze"])};
          width: 128px;
          height: 40px;
          // font-family: IBM Plex Sans;
          font-style: normal;
          font-weight: bold;
          font-size: 12px;
          line-height: 16px;
          color: ${getColor(["white", "plain"])};
        `
      case ButtonType.hollow:
        return css`
          background: ${getColor(["white", "plain"])};
          border-radius: 3px;
          border-color: ${getColor(["green", "greenHaze"])};
          width: 128px;
          height: 40px;
          // font-family: IBM Plex Sans;
          font-style: normal;
          font-weight: bold;
          font-size: 12px;
          line-height: 16px;
          color: ${getColor(["green", "greenHaze"])};
        `
      case ButtonType.bordered:
        return css`
          background: ${getColor(["green", "greenHaze"])};
          border-radius: 3px;
          border-color: ${getColor(["green", "algaeGreen"])};
          width: 128px;
          height: 40px;
          // font-family: IBM Plex Sans;
          font-style: normal;
          font-weight: bold;
          font-size: 12px;
          line-height: 16px;
          color: ${getColor(["white", "plain"])};
        `
      default:
        return css`
          background: ${getColor(["green", "greenHaze"])};
          border-radius: 3px;
          border-color: ${getColor(["green", "greenHaze"])};
          width: 128px;
          height: 40px;
          // font-family: IBM Plex Sans;
          font-style: normal;
          font-weight: bold;
          font-size: 12px;
          line-height: 16px;
          color: ${getColor(["white", "plain"])};
        `
    }
  }};
`

export const StyledCircularProgress = styled(({ ...otherProps }) => (
  <CircularProgress {...otherProps} />
))`
  ${() => `

  `};
`

// background: ${getColor(["gray", "limedSpruce"])};
// size="small"
