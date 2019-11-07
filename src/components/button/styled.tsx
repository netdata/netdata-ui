import React from "react"
import styled, { css } from "styled-components"
import { CircularProgress } from "@rmwc/circular-progress"
import { getColor } from "../../theme/utils"
import { ButtonProps } from "./button"
import { Icon } from "../icon"
import { DEFAULT, NO_FILL, BORDER_LESS } from "./constants"

const getGreenHaze = getColor(["green", "greenHaze"])
const getWhitePure = getColor(["white", "pure"])
const getGreenMalachite = getColor(["green", "malachite"])

const buttonPropsMap = new Map<string, (props: ButtonProps) => any>([
  ["divWidth", ({ label }) => (label ? "134px" : "46px")],
  [
    "buttonWidthHover",
    ({ label, disabled, type }) => {
      if (label) {
        return disabled || type !== "default" ? "128px" : "134px"
      }
      return disabled || type !== DEFAULT ? "40px" : "46px"
    },
  ],
  ["buttonWidthNormal", ({ label }) => (label ? "128px" : "40px")],
  ["buttonHeightHover", ({ disabled, type }) => (disabled || type !== DEFAULT ? "40px" : "46px")],
  [
    "buttonColorNormal",
    ({ type, disabled }) => {
      if (type === BORDER_LESS) {
        return disabled ? getGreenHaze : getColor(["transparent", "full"])
      }
      if (type === NO_FILL) {
        return disabled ? getGreenHaze : getWhitePure
      }
      return getGreenHaze
    },
  ],
  [
    "buttonColorHover",
    ({ type, disabled }) => {
      if (type === BORDER_LESS) {
        return disabled ? getGreenHaze : getColor(["transparent", "full"])
      }
      return disabled ? getGreenHaze : getGreenMalachite
    },
  ],
  [
    "buttonTextColor",
    ({ type, disabled }) => {
      if (type === NO_FILL) {
        return disabled ? getWhitePure : getGreenHaze
      }
      return getWhitePure
    },
  ],
  [
    "buttonTextColorHover",
    ({ type, disabled }) => {
      if (type === NO_FILL || type === BORDER_LESS) {
        return disabled ? getWhitePure : getGreenMalachite
      }
      return getWhitePure
    },
  ],
  ["buttonTextColorActive", () => getWhitePure],
  ["borderWidthNormal", ({ type }) => (type === NO_FILL ? "1px" : "0")],
  [
    "borderWidthHover",
    ({ type, disabled }) => {
      if (type === NO_FILL) {
        return "1px"
      }
      if (type === BORDER_LESS) {
        return "0"
      }
      return disabled ? "0" : "3px"
    },
  ],
  ["borderColor", ({ disabled }) => (disabled ? getGreenHaze : getGreenMalachite)],
  ["borderColorHover", ({ disabled }) => (disabled ? getGreenHaze : getGreenMalachite)],
])

const buttonProps = (propertyName: string, props: ButtonProps): string => {
  const propertyFunction = buttonPropsMap.get(propertyName)
  if (propertyFunction) {
    return propertyFunction(props)
  }
  return "1px"
}

export const StyledIcon = styled(({ name, ...otherProps }) => (
  <div
    style={{
      height: "24px",
      marginRight: "10px",
      fill: buttonProps("buttonTextColor", otherProps),
    }}
  >
    <Icon name={name} />
  </div>
))`
  ${props => {
    return css`
      fill: ${buttonProps("buttonTextColor", props)};
    `
  }};
`

export const StyledButton = styled(({ label, icon, ...otherProps }) => (
  <div
    className="wrapper"
    style={{
      height: "46px",
      width: label ? "134px" : "46px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
    }}
  >
    <button type="button" {...otherProps}>
      {icon ? <StyledIcon name={icon} {...otherProps} /> : null}
      {label}
    </button>
  </div>
))`
  ${props => {
    return css`
    &:focus {
      outline: none;
    }
    opacity: ${props.disabled ? 0.6 : 1.0};
    cursor: ${props.disabled ? "not-allowed" : "pointer"};
    background-color: ${buttonProps("buttonColorNormal", props)};
    border-color: ${getGreenHaze}
    border-style: solid;
    border-radius: 3px;
    border-width: ${buttonProps("borderWidthNormal", props)};
    width: ${buttonProps("buttonWidthNormal", props)};
    height: 40px;
    font-weight: bold;
    font-size: 12px;
    color: ${buttonProps("buttonTextColor", props)};
    &:hover {
      color: ${buttonProps("buttonTextColorHover", props)};
      border-color: ${buttonProps("borderColor", props)};
      border-width: ${buttonProps("borderWidthHover", props)};
      border-radius: ${props.disabled ? "2px" : "4px"};
      width: ${buttonProps("buttonWidthHover", props)};
      height: ${buttonProps("buttonHeightHover", props)};
    }
    &:active {
      color: ${buttonProps("buttonTextColorActive", props)};
      background-color: ${buttonProps("buttonColorHover", props)};
      border-color: ${buttonProps("borderColorHover", props)};
      border-width: ${buttonProps("borderWidthHover", props)};
      border-radius: ${props.disabled ? "2px" : "4px"};
      width: ${buttonProps("buttonWidthHover", props)};
      height: ${buttonProps("buttonHeightHover", props)};
    }
    display: ${props.icon || props.isLoading ? "flex" : "block"};
    flex-flow: row nowrap;
    align-items: center;
    .rmwc-icon {
      margin-right: ${(props.label && props.icon) || props.isLoading ? "8px" : "0"};
      height: 24px;
      width: 24px;
    }
  `
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
