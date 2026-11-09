import styled, { css } from "styled-components"
import { mix, rgba } from "polished"
import {
  getColor as themeGetColor,
  getReadableColor,
  getOrElse,
  getSizeBy,
  DefaultTheme,
  DarkTheme,
} from "@/theme"
import { focusRing, focusRingOutline } from "@/mixins/focusRing"
import { FONT_MONOSPACE } from "@/theme/default/constants"
import { controlSizeOf, controlHeight, controlFontSize } from "@/mixins/controlSize"
import margin from "@/mixins/margin"
import padding from "@/mixins/padding"
import round from "@/mixins/round"
import alignSelf from "@/mixins/alignSelf"
import height from "@/components/templates/mixins/height"
import width from "@/components/templates/mixins/width"
import gap from "@/components/templates/mixins/cssGap"
import justifyContent from "@/components/templates/mixins/justifyContent"
import flex from "@/components/templates/mixins/flex"
import textTransform from "@/mixins/textTransform"
import position from "@/mixins/position"
import { position as styledSystemPosition } from "styled-system"
import { DEFAULT, HOLLOW, BORDER_LESS, LINK } from "./constants"

// Buttons size by the boolean `large`/`compact` props only.
const isInlineLink = ({ flavour, appearance }) => flavour === LINK && appearance === "inline"

const buttonSize = ({ large, compact }) => controlSizeOf({ large, compact })
const dimensionMinimum = value => (typeof value === "object" ? (value.min ?? value.base) : value)
const dimensionValue = value => props =>
  typeof value === "number" ? getSizeBy(value / 2)(props) : value
const buttonHeight = props =>
  dimensionValue(dimensionMinimum(props.height))(props) ||
  (isInlineLink(props) ? "0px" : controlHeight(buttonSize(props))(props))
const buttonWidth = props =>
  dimensionValue(dimensionMinimum(props.width))(props) || buttonHeight(props)

const themes = {
  light: DefaultTheme,
  dark: DarkTheme,
}

const activeStyles = css`
  border-color: ${props => props.colors.borderActive(props)};
  background-color: ${props => props.colors.bgActive(props)};
  color: ${props => props.colors.colorActive(props)};
`

const withTheme = props => {
  if (props.themeType) {
    return {
      ...props,
      theme: themes[props.themeType],
    }
  }
  return { ...props, theme: props.theme }
}

// A colorPalette written before primaryHover/primaryPressed existed maps those states via accent/primaryHighlight.
const legacyPaletteKeys = { primaryHover: "accent", primaryPressed: "primaryHighlight" }

const getColor = name => props => {
  const palette = props?.colorPalette
  const prop = palette?.[name] || palette?.[legacyPaletteKeys[name]] || name
  return themeGetColor(prop)(props)
}

const getTransparent = getColor(["transparent", "full"])

const isNeutral = props => !!props.neutral

const getPrimaryColor = props =>
  isNeutral(props) ? getColor("buttonNeutralFill")(props) : getColor("primary")(props)

const getBorderColor = props =>
  isNeutral(props) ? getColor("buttonNeutralBorder")(props) : getColor("primary")(props)
const getTextColor = props =>
  isNeutral(props)
    ? getColor(props.flavour === HOLLOW ? "text" : "buttonNeutralText")(props)
    : getColor(props.flavour === HOLLOW ? "secondaryColor" : "actionContrastText")(props)
const getBorderHoverColor = props =>
  isNeutral(props) ? getColor("buttonNeutralBorderHover")(props) : getColor("primaryHover")(props)
const getBorderPressedColor = props =>
  isNeutral(props) ? getColor("buttonNeutralBorderHover")(props) : getColor("primaryPressed")(props)

// One hover step and one more pressed step toward the ink colour: darker on light, lighter on dark, never black or white.
const HOVER_STEP = 0.12
const PRESSED_STEP = 0.24
const stepToInk = (step, getBase) => props => mix(step, getColor("main")(props), getBase(props))

const getHoverColor = props =>
  isNeutral(props) ? getColor("buttonNeutralFillHover")(props) : getColor("primaryHover")(props)
const getPressedColor = props =>
  isNeutral(props) ? getColor("buttonNeutralFillPressed")(props) : getColor("primaryPressed")(props)

// Status fills sit mid-lightness, so the label takes whichever ink reads better on each state's fill.
const readableLabelOn = getFill => props => {
  const fill = getFill(props)
  return getReadableColor(
    fill,
    getColor("onColorDark")(props),
    getColor("onColorLight")(props)
  )(props)
}

const getHollowSurface = props => {
  if (isNeutral(props)) return getColor("buttonNeutralHollowHover")(props)
  if (props.danger) return getColor("errorSemi")(props)
  if (props.warning) return getColor("warningSemi")(props)
  if (props.color) return rgba(getColor(props.color)(props), 0.12)
  return getColor("secondaryHighlight")(props)
}

const getHollowPressedSurface = props => {
  if (isNeutral(props)) return getColor("buttonNeutralHollowPressed")(props)
  return getHollowSurface(props)
}

const getBorderlessHoverColor = props =>
  isNeutral(props) ? getColor("buttonNeutralFillHover")(props) : getColor("primaryHover")(props)
const getBorderlessPressedColor = props =>
  isNeutral(props) ? getColor("buttonNeutralFillPressed")(props) : getColor("primaryPressed")(props)
const getBorderlessHoverSurface = props =>
  isNeutral(props) ? getColor("buttonNeutralBorderlessHover")(props) : getTransparent(props)
const getBorderlessPressedSurface = props =>
  isNeutral(props) ? getColor("buttonNeutralBorderlessPressed")(props) : getTransparent(props)

const colorsByFlavour = ({
  flavour = DEFAULT,
  appearance,
  neutral,
  danger,
  warning,
  iconColor,
  color,
}) => {
  const getErrorColor = danger ? getColor("error") : undefined
  const getWarningColor = warning ? getColor("warning") : undefined
  const getSpecialColor = getErrorColor || getWarningColor || (color ? getColor(color) : undefined)
  const getSpecialColorHover = getSpecialColor ? stepToInk(HOVER_STEP, getSpecialColor) : undefined
  const getSpecialColorActive = getSpecialColor
    ? stepToInk(PRESSED_STEP, getSpecialColor)
    : undefined
  const specialIconColor = iconColor ? getColor(iconColor) : undefined
  const getSpecialLabel = getSpecialColor ? readableLabelOn(getSpecialColor) : undefined

  const surfaceColors =
    appearance === "surface" && neutral && !getSpecialColor
      ? {
          color: getColor("controlText"),
          colorHover: getColor("controlHoverText"),
          colorActive: getColor("controlPressedText"),
          bg: getColor("controlBackground"),
          bgHover: getColor("controlHoverBackground"),
          bgActive: getColor("controlPressedBackground"),
          border: getColor("border"),
          borderHover: getColor("controlBorder"),
          borderActive: getColor("controlBorder"),
          iconColor: specialIconColor || getColor("controlText"),
        }
      : {}

  const flavours = {
    [DEFAULT]: {
      color: getSpecialLabel || getTextColor,
      colorHover: getSpecialColor ? readableLabelOn(getSpecialColorHover) : getTextColor,
      colorActive: getSpecialColor ? readableLabelOn(getSpecialColorActive) : getTextColor,
      bg: getSpecialColor || getPrimaryColor,
      bgHover: getSpecialColorHover || getHoverColor,
      bgActive: getSpecialColorActive || getPressedColor,
      border: getSpecialColor || getPrimaryColor,
      borderHover: getSpecialColorHover || getHoverColor,
      borderActive: getSpecialColorActive || getPressedColor,
      iconColor: specialIconColor || getSpecialLabel || getTextColor,
    },
    [HOLLOW]: {
      color: getSpecialColor || getTextColor,
      colorHover: getSpecialColorHover || getTextColor,
      colorActive: getSpecialColorActive || getTextColor,
      bg: getTransparent,
      bgHover: getHollowSurface,
      bgActive: getHollowPressedSurface,
      border: getSpecialColor || getBorderColor,
      borderHover: getSpecialColorHover || getBorderHoverColor,
      borderActive: getSpecialColorActive || getBorderPressedColor,
      iconColor: specialIconColor || getSpecialColor || getPrimaryColor,
      ...surfaceColors,
    },
    [BORDER_LESS]: {
      color: getSpecialColor || getPrimaryColor,
      colorHover: getSpecialColorHover || getBorderlessHoverColor,
      colorActive: getSpecialColorActive || getBorderlessPressedColor,
      bg: getTransparent,
      bgHover: getBorderlessHoverSurface,
      bgActive: getBorderlessPressedSurface,
      border: getTransparent,
      borderHover: getTransparent,
      borderActive: getTransparent,
      iconColor: specialIconColor || getSpecialColor || getPrimaryColor,
    },
    [LINK]: {
      color: getSpecialColor || getPrimaryColor,
      colorHover: getSpecialColorHover || getBorderlessHoverColor,
      colorActive: getSpecialColorActive || getBorderlessPressedColor,
      bg: getTransparent,
      bgHover: getTransparent,
      bgActive: getTransparent,
      border: getTransparent,
      borderHover: getTransparent,
      borderActive: getTransparent,
      iconColor: specialIconColor || getSpecialColor || getPrimaryColor,
    },
  }

  return flavours[flavour] || flavours[DEFAULT]
}

export const StyledButton = styled.button.attrs(
  ({ groupFirst, groupLast, groupMiddle, ...props }) => ({
    padding:
      isInlineLink(props) || !props.hasLabel
        ? [0]
        : props.flavour === LINK
          ? [0, 1]
          : props.large
            ? [0, 4]
            : [0, props.compact ? 3 : 3.5],
    colors: colorsByFlavour(props),
    round:
      groupFirst && groupLast
        ? 1
        : groupFirst
          ? { side: "left", size: 1 }
          : groupLast
            ? { side: "right", size: 1 }
            : groupMiddle
              ? false
              : 1,
    ...withTheme(props),
  })
)`
  && {
    display: ${props => (isInlineLink(props) ? "inline-flex" : "flex")};
    ${props => isInlineLink(props) && "vertical-align: baseline; text-align: inherit;"}
    justify-content: center;
    align-items: center;
    position: relative;
    ${alignSelf};

    font-family: ${({ monospace }) =>
      monospace ? getOrElse(["constants", "FONT_MONOSPACE"], FONT_MONOSPACE) : "inherit"};
    font-weight: ${({ fontWeight, strong }) => fontWeight ?? (strong ? 700 : 500)};
    font-size: ${props =>
      props.fontSize
        ? getSizeBy(props.fontSize / 2)(props)
        : controlFontSize(buttonSize(props))(props)};
    line-height: ${props =>
      props.lineHeight ??
      (isInlineLink(props) ? "inherit" : getSizeBy(props.large ? 2.5 : 2)(props))};
    min-height: ${buttonHeight};
    ${({ hasLabel }) =>
      !hasLabel &&
      css`
        min-width: ${buttonWidth};
      `}
    ${height}
    ${width}
    ${gap}
    ${justifyContent}
    ${flex}
    white-space: nowrap;
    word-break: keep-all;

    cursor: pointer;
    ${({ disabled, disabledOpacity = 0.4 }) => disabled && `opacity: ${disabledOpacity};`}
    pointer-events: ${({ disabled, pointerEvents }) =>
      pointerEvents ?? (disabled ? "none" : "auto")};

    ${({ groupMiddle, groupLast }) => (groupMiddle || groupLast) && "margin-left: -1px;"}
    ${({ groupFirst, groupMiddle, groupLast, flavour }) =>
      (groupFirst || groupMiddle || groupLast) &&
      css`
        ${flavour !== HOLLOW && "z-index: 1;"}
        &:hover,
        &:focus-visible {
          z-index: 2;
        }
      `}
    ${margin}
    ${padding}
    transition:
      background-color 140ms ease-out,
      border-color 140ms ease-out,
      color 140ms ease-out;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }

    background-color: ${props => props.colors.bg(props)};
    color: ${props => props.colors.color(props)};

    border-width: ${props => (isInlineLink(props) ? "0" : "1px")};
    border-style: solid;
    border-color: ${props => props.colors.border(props)};
    ${round}
    box-sizing: border-box;

    ${position}
    ${styledSystemPosition}

    text-decoration: ${({ underline }) => (underline ? "underline" : "none")};
    ${({ underlineColor }) =>
      underlineColor &&
      css`
        text-decoration-color: ${getColor(underlineColor)};
      `}
    ${props =>
      props.underlineOffset !== undefined &&
      css`
        text-underline-offset: ${dimensionValue(props.underlineOffset)};
      `}
    & > span {
      ${textTransform};
      ${props =>
        props["data-unwrapped-children"] === undefined &&
        `margin-left: ${props.hasIcon ? "4px" : "0px"};`}
    }

    &:hover {
      border-color: ${props => props.colors.borderHover(props)};
      background-color: ${props => props.colors.bgHover(props)};
      color: ${props => props.colors.colorHover(props)};
      text-decoration: ${({ flavour, underline }) =>
        flavour === LINK || underline ? "underline" : "none"};
      ${({ underlineColor }) => underlineColor && "text-decoration-color: currentColor;"}

      .button-icon {
        fill: ${props => props.colors.colorHover(props)};
      }
    }

    &:active
      ${props => props.highlightExpanded !== false && ', &[aria-expanded="true"]'}
      ${props => props.highlightPressed !== false && ', &[aria-pressed="true"]'} {
      ${activeStyles}
    }
    ${props => props.active && activeStyles}

    &[aria-disabled="true"] {
      opacity: ${({ disabledOpacity = 0.4 }) => disabledOpacity};
      cursor: not-allowed;
    }

    &[aria-disabled="true"]:hover,
    &[aria-disabled="true"]:active {
      border-color: ${props => props.colors.border(props)};
      background-color: ${props => props.colors.bg(props)};
      color: ${props => props.colors.color(props)};
      text-decoration: none;

      .button-icon {
        fill: ${props => props.colors.iconColor(props)};
      }
    }

    ${({ hoverBrightness }) =>
      hoverBrightness !== undefined &&
      css`
        &:hover:not(:disabled):not([aria-disabled="true"]) {
          filter: brightness(${hoverBrightness});
        }
      `}
    ${({ hoverBorderColor }) =>
      hoverBorderColor !== undefined &&
      css`
        &:hover:not(:disabled):not([aria-disabled="true"]) {
          border-color: ${getColor(hoverBorderColor)};
        }
      `}

    ${focusRing}
    ${props =>
      isInlineLink(props) &&
      css`
        &:focus-visible {
          ${focusRingOutline}
          outline-color: ${getColor("segmentedFocus")};
          outline-offset: ${getSizeBy(-0.25)};
        }
      `}

    .button-icon {
      height: ${props =>
        props.iconWidth
          ? typeof props.iconWidth === "string"
            ? props.iconWidth
            : `${props.iconWidth}px`
          : getSizeBy(1.75)(props)};
      width: ${props =>
        props.iconHeight
          ? typeof props.iconHeight === "string"
            ? props.iconHeight
            : `${props.iconHeight}px`
          : getSizeBy(1.75)(props)};
      fill: ${props => props.colors.iconColor(props)};
    }

    .ntd-spinner {
      fill: none;
      stroke-width: 17px;
      stroke-dasharray: 100;
      stroke-dashoffset: 100;
      animation: ntd-draw 1s linear infinite;
      stroke: ${props => props.colors.color(props)};
      width: 24px;

      @media (prefers-reduced-motion: reduce) {
        animation: none;
        stroke-dashoffset: 0;
      }
    }

    .path {
      stroke: ${props => props.colors.color(props)};
    }

    @keyframes ntd-draw {
      to {
        stroke-dashoffset: 0;
      }
    }
  }
`
