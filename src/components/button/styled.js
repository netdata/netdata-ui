import styled, { css } from "styled-components"
import { getColor, getSizeBy, DefaultTheme, DarkTheme } from "src/theme"
import margin from "src/mixins/margin"
import padding from "src/mixins/padding"
import alignSelf from "src/mixins/alignSelf"
import textTransform from "src/mixins/textTransform"
import { DEFAULT, HOLLOW, BORDER_LESS } from "./constants"

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

const getPrimaryColor = props =>
  props.neutral ? getColor("text")(props) : getColor("primary")(props)

const getBorderColor = props =>
  props.neutral ? getColor("border")(props) : getColor("primary")(props)
const getTextColor = getColor("bright")
const getHoverColor = props =>
  props.neutral ? getColor("textFocus")(props) : getColor("accent")(props)
const getAccentColor = props =>
  props.neutral ? getColor("textFocus")(props) : getColor("successLite")(props)
const getMain = props =>
  props.neutral
    ? getColor(props.disabled ? "disabled" : "mainBackground")(props)
    : getColor("mainBackground")(props)
const getTransparent = getColor(["transparent", "full"])

const colorsByFlavour = ({ flavour = DEFAULT, danger, warning, iconColor }) => {
  const getErrorColor = danger ? getColor("error") : undefined
  const getWarningColor = warning ? getColor("warning") : undefined
  const getSpecialColor = getErrorColor || getWarningColor
  const specialIconColor = iconColor ? getColor(iconColor) : undefined

  const flavours = {
    [DEFAULT]: {
      color: getTextColor,
      colorHover: getTextColor,
      colorActive: getTextColor,
      bg: getSpecialColor || getPrimaryColor,
      bgHover: getSpecialColor || getHoverColor,
      bgActive: getSpecialColor || getAccentColor,
      border: getSpecialColor || getPrimaryColor,
      borderHover: getSpecialColor || getHoverColor,
      borderActive: getSpecialColor || getAccentColor,
      iconColor: specialIconColor || getTextColor,
    },
    [HOLLOW]: {
      color: getSpecialColor || getPrimaryColor,
      colorHover: getSpecialColor || getAccentColor,
      colorActive: getSpecialColor || getAccentColor,
      bg: getTransparent,
      bgHover: getTransparent,
      bgActive: getSpecialColor || getMain,
      border: getSpecialColor || getBorderColor,
      borderHover: getSpecialColor || getHoverColor,
      borderActive: getSpecialColor || getAccentColor,
      iconColor: specialIconColor || getTextColor,
    },
    [BORDER_LESS]: {
      color: getSpecialColor || getPrimaryColor,
      colorHover: getSpecialColor || getAccentColor,
      colorActive: getSpecialColor || getAccentColor,
      bg: getTransparent,
      bgHover: getTransparent,
      bgActive: getTransparent,
      border: getTransparent,
      borderHover: getTransparent,
      borderActive: getTransparent,
      iconColor: specialIconColor || getTextColor,
    },
  }

  return flavours[flavour] || flavours[DEFAULT]
}

export const StyledButton = styled.button.attrs(props => ({
  padding: props.padding || [2],
  colors: colorsByFlavour(props),
  ...withTheme(props),
}))`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    ${alignSelf};

    width: ${props =>
      props.width
        ? props.width
        : props.hasLabel
        ? getSizeBy(16)
        : getSizeBy(props.tiny ? 2 : props.small ? 3 : 4)};
    height: ${props =>
      props.hasLabel
        ? getSizeBy(props.small ? 4 : 5)
        : getSizeBy(props.tiny ? 2 : props.small ? 3 : 4)};

    font-weight: 500;
    font-size: ${({ small, tiny }) => (tiny ? "10px" : small ? "12px" : "14px")};
    line-height: ${getSizeBy(2)};
    white-space: nowrap;
    word-break: keep-all;

    cursor: pointer;
    opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
    pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

    ${margin}
    ${padding}
    transition: all 150ms;

    background-color: ${props => props.colors.bg(props)};
    color: ${props => props.colors.color(props)};

    border-width: 1px;
    border-style: solid;
    border-color: ${props => props.colors.border(props)};
    border-radius: 4px;
    box-sizing: border-box;

    text-decoration: none;
    & > span {
      ${textTransform};
      margin-left: ${({ hasIcon }) => (hasIcon ? getSizeBy(1.5) : "0px")};
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
      height: ${getSizeBy(2)};
      width: ${getSizeBy(2)};
      fill: ${props => props.colors.color(props)};
    }

    .button-icon__color {
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
