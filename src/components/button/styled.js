import styled, { css } from "styled-components"
import { mix, rgba } from "polished"
import { getColor as themeGetColor, getReadableColor, getSizeBy, DefaultTheme, DarkTheme } from "@/theme"
import { focusRing } from "@/mixins/focusRing"
import { controlSizeOf, controlHeight, controlFontSize } from "@/mixins/controlSize"
import margin from "@/mixins/margin"
import padding from "@/mixins/padding"
import round from "@/mixins/round"
import alignSelf from "@/mixins/alignSelf"
import textTransform from "@/mixins/textTransform"
import position from "@/mixins/position"
import { position as styledSystemPosition } from "styled-system"
import { DEFAULT, HOLLOW, BORDER_LESS, LINK } from "./constants"

// Buttons size by the boolean `large`/`compact` props only.
const buttonSize = ({ large, compact }) => controlSizeOf({ large, compact })
const buttonHeight = props => controlHeight(buttonSize(props))(props)

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

const getNeutralColor = getColor("buttonNeutralFill")

const getHoverColor = props =>
  isNeutral(props) ? getColor("buttonNeutralFillHover")(props) : getColor("primaryHover")(props)
const getPressedColor = props =>
  isNeutral(props)
    ? getColor("buttonNeutralFillPressed")(props)
    : getColor("primaryPressed")(props)

// Status fills sit mid-lightness, so the label takes whichever ink reads better on each state's fill.
const readableLabelOn = getFill => props => {
  const fill = getFill(props)
  return getReadableColor(fill, getColor("onColorDark")(props), getColor("onColorLight")(props))(props)
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
  isNeutral(props)
    ? getColor("buttonNeutralFillPressed")(props)
    : getColor("primaryPressed")(props)
const getBorderlessHoverSurface = props =>
  isNeutral(props) ? getColor("buttonNeutralBorderlessHover")(props) : getTransparent(props)
const getBorderlessPressedSurface = props =>
  isNeutral(props) ? getColor("buttonNeutralBorderlessPressed")(props) : getTransparent(props)

const colorsByFlavour = ({ flavour = DEFAULT, danger, warning, iconColor, color }) => {
  const getErrorColor = danger ? getColor("error") : undefined
  const getWarningColor = warning ? getColor("warning") : undefined
  const getSpecialColor = getErrorColor || getWarningColor || (color ? getColor(color) : undefined)
  const getSpecialColorHover = getSpecialColor ? stepToInk(HOVER_STEP, getSpecialColor) : undefined
  const getSpecialColorActive = getSpecialColor
    ? stepToInk(PRESSED_STEP, getSpecialColor)
    : undefined
  const specialIconColor = iconColor ? getColor(iconColor) : undefined
  const getSpecialLabel = getSpecialColor ? readableLabelOn(getSpecialColor) : undefined

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
    padding: !props.hasLabel
      ? [0]
      : props.flavour === LINK
        ? [0, 1]
        : props.large
          ? [0, 4]
          : [0, 3],
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
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    ${alignSelf};

    font-family: inherit;
    font-weight: ${({ strong }) => (strong ? 700 : 500)};
    font-size: ${props => controlFontSize(buttonSize(props))(props)};
    line-height: ${({ large }) => getSizeBy(large ? 2.5 : 2)};
    min-height: ${buttonHeight};
    ${({ hasLabel }) =>
      !hasLabel &&
      css`
        min-width: ${buttonHeight};
      `}
    white-space: nowrap;
    word-break: keep-all;

    cursor: pointer;
    ${({ disabled }) => disabled && `opacity: 0.4;`}
    pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

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

    border-width: 1px;
    border-style: solid;
    border-color: ${props => props.colors.border(props)};
    ${round}
    box-sizing: border-box;

    ${position}
    ${styledSystemPosition}

    text-decoration: none;
    & > span {
      ${textTransform};
      margin-left: ${({ hasIcon }) => (hasIcon ? "4px" : "0px")};
    }

    &:hover {
      border-color: ${props => props.colors.borderHover(props)};
      background-color: ${props => props.colors.bgHover(props)};
      color: ${props => props.colors.colorHover(props)};
      text-decoration: ${({ flavour }) => (flavour === LINK ? "underline" : "none")};

      .button-icon {
        fill: ${props => props.colors.colorHover(props)};
      }
    }

    &:active,
    &[aria-expanded="true"] {
      ${activeStyles}
    }
    ${props => props.active && activeStyles}

    &[aria-disabled="true"] {
      opacity: 0.4;
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

    ${focusRing}

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
