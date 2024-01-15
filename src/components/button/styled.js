import styled, { css } from "styled-components"
import { lighten, darken } from "polished"
import { getColor, getSizeBy, DefaultTheme, DarkTheme } from "@/theme"
import margin from "@/mixins/margin"
import padding from "@/mixins/padding"
import round from "@/mixins/round"
import alignSelf from "@/mixins/alignSelf"
import textTransform from "@/mixins/textTransform"
import position from "@/mixins/position"
import { position as styledSystemPosition } from "styled-system"
import { DEFAULT, HOLLOW, BORDER_LESS } from "./constants"

const themes = {
  light: DefaultTheme,
  dark: DarkTheme,
}

const activeStyles = css`
  border-color: ${props => props.colors.borderActive(props)};
  background-color: ${props => props.colors.bgActive(props)};
  color: ${props => props.colors.colorActive(props)};
  box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25);
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

const getPrimaryColor = props =>
  props.neutral
    ? getColor(props.flavour === HOLLOW ? "textFocus" : "text")(props)
    : getColor("primary")(props)

const getBorderColor = props =>
  props.neutral ? getColor("generic")(props) : getColor("primary")(props)
const getTextColor = props =>
  props.neutral
    ? getColor(props.flavour === HOLLOW ? "text" : "mainBackground")(props)
    : getColor(props.flavour === HOLLOW ? "secondaryColor" : "mainBackground")(props)
const getHoverColor = props =>
  props.neutral ? getColor("generic")(props) : getColor("accent")(props)
const getAccentColor = props =>
  props.neutral
    ? getColor(props.flavour === BORDER_LESS ? "textFocus" : "neutralHighlight")(props)
    : getColor(props.flavour === HOLLOW ? "secondaryHighlight" : "primaryHighlight")(props)
const getTransparent = getColor(["transparent", "full"])

const colorsByFlavour = ({ flavour = DEFAULT, danger, warning, iconColor }) => {
  const getErrorColor = danger ? getColor("error") : undefined
  const getWarningColor = warning ? getColor("warning") : undefined
  const getSpecialColor = getErrorColor || getWarningColor
  const getSpecialColorHover = getSpecialColor
    ? props => lighten(0.2, getSpecialColor(props))
    : undefined
  const getSpecialColorActive = getSpecialColor
    ? props => darken(0.2, getSpecialColor(props))
    : undefined
  const specialIconColor = iconColor ? getColor(iconColor) : undefined

  const flavours = {
    [DEFAULT]: {
      color: getTextColor,
      colorHover: getTextColor,
      colorActive: getTextColor,
      bg: getSpecialColor || getPrimaryColor,
      bgHover: getSpecialColorHover || getHoverColor,
      bgActive: getSpecialColorActive || getAccentColor,
      border: getSpecialColor || getPrimaryColor,
      borderHover: getSpecialColorHover || getHoverColor,
      borderActive: getSpecialColorActive || getAccentColor,
      iconColor: specialIconColor || getTextColor,
    },
    [HOLLOW]: {
      color: getSpecialColor || getTextColor,
      colorHover: getSpecialColorHover || getTextColor,
      colorActive: getSpecialColorActive || getTextColor,
      bg: getTransparent,
      bgHover: getAccentColor,
      bgActive: getAccentColor,
      border: getSpecialColor || getBorderColor,
      borderHover: getSpecialColorHover || getPrimaryColor,
      borderActive: getSpecialColorActive || getPrimaryColor,
      iconColor: specialIconColor || getSpecialColor || getPrimaryColor,
    },
    [BORDER_LESS]: {
      color: getSpecialColor || getPrimaryColor,
      colorHover: getSpecialColorHover || getAccentColor,
      colorActive: getSpecialColorActive || getAccentColor,
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
    padding: props.padding || props.tiny ? [0.5, 1] : props.small ? [1, 3] : [2],
    colors: colorsByFlavour(props),
    round: groupFirst ? { side: "left" } : groupLast ? { side: "right" } : !groupMiddle,
    ...withTheme(props),
  })
)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    ${alignSelf};

    font-weight: ${({ strong }) => (strong ? 700 : 500)};
    font-size: ${({ small, tiny }) => (tiny ? "10px" : small ? "12px" : "14px")};
    white-space: nowrap;
    word-break: keep-all;

    cursor: pointer;
    ${({ disabled }) => disabled && `opacity: 0.4;`}
    pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

    ${margin}
    ${padding}
    transition: all 150ms;

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
      text-decoration: none;

      .button-icon {
        fill: ${props => props.colors.colorHover(props)};
      }
    }

    &:active {
      ${activeStyles}
    }
    ${props =>
      props.active &&
      `
      ${activeStyles}
    `}

    &:focus {
      outline: none;
    }

    .button-icon {
      height: ${props =>
        props.iconWidth
          ? typeof props.iconWidth === "string"
            ? props.iconWidth
            : `${props.iconWidth}px`
          : getSizeBy(2)(props)};
      width: ${props =>
        props.iconHeight
          ? typeof props.iconHeight === "string"
            ? props.iconHeight
            : `${props.iconHeight}px`
          : getSizeBy(2)(props)};
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
