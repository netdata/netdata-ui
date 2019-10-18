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
      case ButtonType.noFill:
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
          &:hover {
            border-color: ${getColor(["green", "hover"])};
            border-width: 3px;
          }
          &:active {
            background: ${getColor(["green", "malachite"])};
          }
          &:active {
            background: ${getColor(["green", "malachite"])};
            border-color: ${getColor(["green", "greenHaze"])};
            border-width: 0px;
          }
        `
      default:
        return css`
          background: ${getColor(["green", "greenHaze"])};
          border-radius: 3px;
          border-width: 0px;
          width: 128px;
          height: 40px;
          // font-family: IBM Plex Sans;
          font-style: normal;
          font-weight: bold;
          font-size: 12px;
          line-height: 16px;
          color: ${getColor(["white", "plain"])};
          &:hover {
            border-color: ${getColor(["green", "hover"])};
            border-width: 3px;
            width: 132px;
            height: 44px;
          }
          &:active {
            background: ${getColor(["green", "malachite"])};
            border-color: ${getColor(["green", "greenHaze"])};
            border-width: 0px;
            width: 132px;
            height: 44px;
          }
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
