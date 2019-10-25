import React from "react"
import styled, { css } from "styled-components"
import { Button } from "@rmwc/button"
import { CircularProgress } from "@rmwc/circular-progress"
import { getColor } from "../../theme/utils"

const buttonTemplates = new Map([
  [
    "default",
    (props: any) => css`
      div {
        width: ${props.label ? "134px" : "46px"};
        height: 46px;
      }
      opacity: ${props.disabled ? 0.6 : 1.0};
      cursor: ${props.disabled ? "not-allowed" : "pointer"};
      background: ${
        props.type === "noFill" ? getColor(["white", "pure"]) : getColor(["green", "greenHaze"])
      };
      border-color: ${getColor(["green", "greenHaze"])}
      border-style: solid;
      border-radius: 3px;
      border-width: ${props.type === "noFill" ? "1px;" : "0px"}
      width: ${props.label ? "128px" : "40px"};
      height: 40px;
      font-family: IBM Plex Sans;
      font-weight: bold;
      font-size: 12px;
      color: ${
        props.type === "noFill" ? getColor(["green", "greenHaze"]) : getColor(["white", "pure"])
      };
      &:hover {
        border-color: ${
          props.disabled
            ? getColor(["transparent", "fullyTransparent"])
            : getColor(["green", "hoverGreen"])
        };
        border-width: 3px;
        border-radius: 6px;
        width: ${props.label ? "134px" : "46px"};
        height: ${props.disabled ? "40px" : "46px"}
      }
      &:active {
        color: ${getColor(["white", "pure"])}        
        background: ${
          props.disabled ? getColor(["green", "greenHaze"]) : getColor(["green", "malachite"])
        };
        border-color: ${
          props.disabled
            ? getColor(["transparent", "fullyTransparent"])
            : getColor(["green", "malachite"])
        };
        border-width: 3px;
        border-radius: 6px;
        width: ${props.label ? "134px" : "46px"};
        height: ${props.disabled ? "40px" : "46px"}
      &:focus {
        outline: none;
      }
      display: ${props.icon.props.name || props.isLoading ? "flex" : "block"};
      flex-flow: row nowrap;
      align-items: center;
      .rmwc-icon {
        margin-right: ${(props.label && props.icon.props.name) || props.isLoading ? "8px" : "0px"};
        height: 24px;
        width: 24px;
      }
    `,
  ],
])

export const StyledButton = styled(({ label, icon, ...otherProps }) => (
  <div>
    <Button label={label} icon={icon} {...otherProps} />
  </div>
))`
  ${props => {
    const template = buttonTemplates.get("default")
    return template ? template(props) : css``
  }};
`

export const StyledCircularProgress = styled(({ size, ...otherProps }) => (
  <CircularProgress size={size} {...otherProps} />
))`
  ${() => {
    return css`
      .rmwc-circular-progress {
        font-size: 1.5rem;
        position: relative;
        display: inline-block;
        width: 1em;
        height: 1em;
        -webkit-transform: rotate(-90deg);
        transform: rotate(-90deg);
        color: ${getColor(["white", "pure"])};
      }

      .rmwc-circular-progress--size-xsmall {
        font-size: 1.125rem;
      }

      .rmwc-circular-progress--size-small {
        font-size: 1.25rem;
      }

      .rmwc-circular-progress--size-medium {
        font-size: 1.5rem;
      }

      .rmwc-circular-progress--size-large {
        font-size: 2.25rem;
      }

      .rmwc-circular-progress--size-xlarge {
        font-size: 3rem;
      }

      .rmwc-circular-progress--indeterminate .rmwc-circular-progress__circle {
        animation: rmwc-circular-progress-indeterminate-bar-rotate 2s linear infinite;
      }

      .rmwc-circular-progress--indeterminate .rmwc-circular-progress__path {
        animation: rmwc-circular-progress-indeterminate-bar-dash 1.5s ease-in-out infinite;

        stroke-dasharray: 2.08%, 416%;
        stroke-dashoffset: 0;
      }

      .rmwc-circular-progress__circle {
        height: 100%;
        width: 100%;
      }

      .rmwc-circular-progress__path {
        -webkit-transition: stroke-dasharray 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        transition: stroke-dasharray 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        fill: none;
        stroke-dasharray: 0, 416%;
        stroke-dashoffset: 0;
        stroke-linecap: round;
        stroke-miterlimit: 20;
        stroke-width: 0.125rem;
        stroke: currentColor;
      }

      .rmwc-circular-progress--thickerstroke .rmwc-circular-progress__path {
        stroke-width: 0.25rem;
      }

      /** Overrides for icons */
      .rmwc-icon .rmwc-circular-progress {
        font-size: inherit;
      }

      @keyframes rmwc-circular-progress-indeterminate-bar-rotate {
        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes rmwc-circular-progress-indeterminate-bar-dash {
        0% {
          stroke-dasharray: 2.08%, 416%;
          stroke-dashoffset: 0%;
        }
        50% {
          stroke-dasharray: 185.4%, 416%;
          stroke-dashoffset: -72.9%;
        }
        to {
          stroke-dasharray: 185.4%, 416%;
          stroke-dashoffset: -258.33%;
        }
      }
    `
  }};
`

/*
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
