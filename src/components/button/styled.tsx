import React from "react"
import styled, { css } from "styled-components"
import { Button } from "@rmwc/button"
import { CircularProgress } from "@rmwc/circular-progress"
// import "@rmwc/circular-progress/circular-progress.css"
import { getColor } from "../../theme/utils"
import { ButtonType } from "./button"

// export const StyledButton = styled(({ ...otherProps }) => <Button {...otherProps} />)`
export const StyledButton = styled(({ label, ...otherProps }) => (
  <Button label={label} {...otherProps} />
))`
  ${props => {
    if (props.disabled) {
      return css`
        opacity: 0.6;
        cursor: not-allowed;
        background: ${getColor(["green", "greenHaze"])};
        border-radius: 3px;
        border-color: ${getColor(["green", "greenHaze"])};
        width: ${props.label ? "128px" : "40px"};
        height: 40px;
        font-family: IBM Plex Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 12px;
        color: ${getColor(["white", "pure"])};
        &:active {
          border-width: 0px;
        }
        &:focus {
          outline: none;
        }
        display: ${props.icon ? "flex" : "block"};
        flex-flow: row nowrap;
        align-items: center;
        .rmwc-icon {
          margin-right: ${props.label ? "12px" : "0px"};
          height: 24px;
        }
      `
    }
    switch (props.type) {
      case ButtonType.noFill:
        return css`
          background: ${getColor(["white", "pure"])};
          border-radius: 3px;
          border-style: solid;
          border-color: ${getColor(["green", "greenHaze"])};
          width: ${props.label ? "128px" : "40px"};
          height: 40px;
          font-family: IBM Plex Sans;
          font-style: normal;
          font-weight: bold;
          font-size: 12px;
          color: ${getColor(["green", "greenHaze"])};
          &:hover {
            border-style: solid;
            border-color: ${getColor(["green", "hoverGreen"])};
            border-width: 3px;
            width: ${props.label ? "132px" : "44px"};
            height: 44px;
          }
          &:active {
            background: ${getColor(["green", "malachite"])};
            border-style: solid;
            border-color: ${getColor(["green", "malachite"])};
            border-width: 3px;
            width: ${props.label ? "132px" : "44px"};
            height: 44px;
            color: ${getColor(["white", "pure"])};
          }
          &:focus {
            outline: none;
          }
          display: ${props.icon ? "flex" : "block"};
          flex-flow: row nowrap;
          align-items: center;
          .rmwc-icon {
            margin-right: ${props.label ? "8px" : "0px"};
            height: 24px;
          }
          &.rmwc-icon path {
              fill: ${getColor(["green", "malachite"])};
          }
        }
        `
      default:
        return css`
          background: ${getColor(["green", "greenHaze"])};
          border-radius: 3px;
          border-width: 0px;
          width: ${props.label ? "128px" : "40px"};
          height: 40px;
          font-family: IBM Plex Sans;
          font-weight: bold;
          font-size: 12px;
          color: ${getColor(["white", "pure"])};
          &:hover {
            border-style: solid;
            border-color: ${getColor(["green", "hoverGreen"])};
            border-width: 3px;
            width: ${props.label ? "134px" : "46px"};
            height: 46px;
          }
          &:active {
            background: ${getColor(["green", "malachite"])};
            border-style: solid;
            border-color: ${getColor(["green", "malachite"])};
            border-width: 3px;
            width: ${props.label ? "134px" : "46px"};
            height: 46px;
          }
          &:focus {
            outline: none;
          }
          display: ${props.icon ? "flex" : "block"};
          flex-flow: row nowrap;
          align-items: center;
          .rmwc-icon {
            margin-right: ${props.label ? "8px" : "0px"};
            height: 24px;
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

/*
RMWC Progress indication inside buttons TBD



RMWC ThemeProvider vars
          --mdc-theme-primary: ${getColor(["green", "greenHaze"])};
          --mdc-theme-secondary: ${getColor(["green", "greenHaze"])};
          --mdc-theme-error: ${getColor(["green", "greenHaze"])};
          --mdc-theme-background: ${getColor(["green", "greenHaze"])};
          --mdc-theme-surface: #37474f;
          --mdc-theme-on-primary: rgba(255, 255, 255, 0.87);
          --mdc-theme-on-secondary: rgba(0, 0, 0, 0.87);
          --mdc-theme-on-surface: rgba(255, 255, 255, 0.87);
          --mdc-theme-on-error: #fff;
          --mdc-theme-text-primary-on-background: rgba(255, 255, 255, 1);
          --mdc-theme-text-secondary-on-background: rgba(255, 255, 255, 0.7);
          --mdc-theme-text-hint-on-background: rgba(255, 255, 255, 0.5);
          --mdc-theme-text-disabled-on-background: rgba(255, 255, 255, 0.5);
          --mdc-theme-text-icon-on-background: rgba(255, 255, 255, 0.5);
          --mdc-theme-text-primary-on-light: rgba(0, 0, 0, 0.87);
          --mdc-theme-text-secondary-on-light: rgba(0, 0, 0, 0.54);
          --mdc-theme-text-hint-on-light: rgba(0, 0, 0, 0.38);
          --mdc-theme-text-disabled-on-light: rgba(0, 0, 0, 0.38);
          --mdc-theme-text-icon-on-light: rgba(0, 0, 0, 0.38);
          --mdc-theme-text-primary-on-dark: white;
          --mdc-theme-text-secondary-on-dark: rgba(255, 255, 255, 0.7);
          --mdc-theme-text-hint-on-dark: rgba(255, 255, 255, 0.5);
          --mdc-theme-text-disabled-on-dark: rgba(255, 255, 255, 0.5);
          --mdc-theme-text-icon-on-dark: rgba(255, 255, 255, 0.5);
*/
