import styled from "styled-components"
import { getColor, getSizeBy } from "../../theme/utils"
import { DEFAULT, HOLLOW, BORDER_LESS } from "./constants"
import { ButtonProps } from "./button"

const getPrimaryColor = props =>
  props.neutral ? getColor("border")(props) : getColor("primary")(props)
const getTextColor = props =>
  props.neutral ? getColor("main")(props) : getColor("mainBackground")(props)
const getAccentColor = props =>
  props.neutral ? getColor("textFocus")(props) : getColor("accent")(props)
const getMain = props =>
  props.neutral
    ? getColor(props.disabled ? "disabled" : "border")(props)
    : getColor("mainBackground")(props)
const getTransparent = getColor(["transparent", "full"])

const colorsByFlavour = ({ flavour = DEFAULT, danger, warning }: ButtonProps) => {
  const getErrorColor = danger ? getColor("error") : undefined
  const getWarningColor = warning ? getColor("warning") : undefined
  const getSpecialColor = getErrorColor || getWarningColor

  const flavours = {
    [DEFAULT]: {
      color: getTextColor,
      colorHover: getTextColor,
      colorActive: getTextColor,
      bg: getSpecialColor || getPrimaryColor,
      bgHover: getSpecialColor || getPrimaryColor,
      bgActive: getSpecialColor || getAccentColor,
      border: getSpecialColor || getPrimaryColor,
      borderHover: getSpecialColor || getAccentColor,
      borderActive: getSpecialColor || getAccentColor,
    },
    [HOLLOW]: {
      color: getSpecialColor || getPrimaryColor,
      colorHover: getSpecialColor || getAccentColor,
      colorActive: getTextColor,
      bg: getMain,
      bgHover: getMain,
      bgActive: getSpecialColor || getMain,
      border: getSpecialColor || getPrimaryColor,
      borderHover: getSpecialColor || getAccentColor,
      borderActive: getSpecialColor || getAccentColor,
    },
    [BORDER_LESS]: {
      color: getSpecialColor || getTextColor,
      colorHover: getSpecialColor || getAccentColor,
      colorActive: getSpecialColor || getPrimaryColor,
      bg: getTransparent,
      bgHover: getTransparent,
      bgActive: getTransparent,
      border: getTransparent,
      borderHover: getTransparent,
      borderActive: getTransparent,
    },
  }

  return flavours[flavour] || flavours[DEFAULT]
}

type StyledButtonProps = {
  colors: object
  hasLabel: boolean
}

export const StyledButton = styled.button.attrs((props: ButtonProps) => ({
  colors: colorsByFlavour(props),
}))<ButtonProps & StyledButtonProps>`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    width: ${props => (props.hasLabel ? getSizeBy(16) : getSizeBy(props.small ? 3 : 4))};
    height: ${props => (props.hasLabel ? getSizeBy(5) : getSizeBy(props.small ? 3 : 4))};

    font-weight: bold;
    font-size: 12px;
    line-height: ${getSizeBy(2)};
    white-space: nowrap;
    word-break: keep-all;

    cursor: pointer;
    opacity: ${({ disabled, neutral }) => {
      if (neutral) return 1
      return disabled ? 0.4 : 1
    }};
    pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

    padding: ${getSizeBy(1)};
    transition: all 150ms;

    background-color: ${props => props.colors.bg(props)};
    color: ${props => props.colors.color(props)};

    border-width: 1px;
    border-style: solid;
    border-color: ${props => props.colors.border(props)};
    border-radius: 2px;
    box-sizing: border-box;

    text-decoration: none;
    ${props => props.uppercase && "text-transform: uppercase;"}

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
      border-color: ${props => props.colors.borderActive(props)};
      background-color: ${props => props.colors.bgActive(props)};
      color: ${props => props.colors.colorActive(props)};
    }

    &:focus {
      outline: none;
    }

    .button-icon {
      position: absolute;
      left: ${props => (props.hasLabel ? "4px" : "auto")};
      height: ${getSizeBy(2)};
      width: ${getSizeBy(2)};
      fill: ${props => props.colors.color(props)};
    }

    .ntd-spinner {
      fill: none;
      stroke-width: 17px;
      stroke-dasharray: 100;
      stroke-dashoffset: 100;
      animation: ntd-draw 1s linear infinite;
      stroke: ${props => props.colors.bg(props)};
      width: 24px;
    }

    .path {
      stroke: ${props => props.colors.bg(props)};
    }

    @keyframes ntd-draw {
      to {
        stroke-dashoffset: 0;
      }
    }
  }
`
