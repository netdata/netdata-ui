import styled from "styled-components"
import { getColor, getSizeBy } from "../../theme/utils"
import { DEFAULT, HOLLOW, BORDER_LESS } from "./constants"
import { ButtonProps } from "./button"

const getGreenHaze = getColor(["green", "greenHaze"])
const getRedOrange = getColor(["red", "redOrange"])
const getYellowAmber = getColor(["yellow", "amber"])
const getWhitePure = getColor(["white", "pure"])
const getGreenMalachite = getColor(["green", "malachite"])

const colorsByFlavor = ({ flavor = DEFAULT, danger, warning }: ButtonProps) => {
  const getDangerColor = danger ? getRedOrange : undefined
  const getWarningColor = warning ? getYellowAmber : undefined
  const getSpecialColor = getDangerColor || getWarningColor

  const flavors = {
    [DEFAULT]: {
      color: getWhitePure,
      colorHover: getWhitePure,
      colorActive: getWhitePure,
      bg: getSpecialColor || getGreenHaze,
      bgHover: getSpecialColor || getGreenHaze,
      bgActive: getSpecialColor || getGreenMalachite,
      border: getSpecialColor || getGreenHaze,
      borderHover: getSpecialColor || getGreenMalachite,
      borderActive: getSpecialColor || getGreenMalachite,
    },
    [HOLLOW]: {
      color: getSpecialColor || getGreenHaze,
      colorHover: getSpecialColor || getGreenMalachite,
      colorActive: getWhitePure,
      bg: getWhitePure,
      bgHover: getWhitePure,
      bgActive: getSpecialColor || getGreenMalachite,
      border: getSpecialColor || getGreenHaze,
      borderHover: getSpecialColor || getGreenMalachite,
      borderActive: getSpecialColor || getGreenMalachite,
    },
    [BORDER_LESS]: {
      color: getSpecialColor || getGreenHaze,
      colorHover: getSpecialColor || getGreenMalachite,
      colorActive: getSpecialColor || getGreenHaze,
      bg: getWhitePure,
      bgHover: getWhitePure,
      bgActive: getWhitePure,
      border: getWhitePure,
      borderHover: getWhitePure,
      borderActive: getWhitePure,
    },
  }

  return flavors[flavor] || flavors[DEFAULT]
}

type StyledButtonProps = {
  colors: object
  hasLabel: boolean
}

export const StyledButton = styled.button.attrs((props: ButtonProps) => ({
  colors: colorsByFlavor(props),
}))<ButtonProps & StyledButtonProps>`
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
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
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

  &:hover {
    border-color: ${props => props.colors.borderHover(props)};
    background-color: ${props => props.colors.bgHover(props)};
    color: ${props => props.colors.colorHover(props)};

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
    stroke: #fff;
    width: 24px;
  }

  .path {
    stroke: #fff;
  }

  @keyframes ntd-draw {
    to {
      stroke-dashoffset: 0;
    }
  }
`
