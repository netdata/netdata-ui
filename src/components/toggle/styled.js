import styled, { css } from "styled-components"
import { getColor, getSizeBy, getSizeUnit } from "@/theme/utils"
import { focusRingOutline } from "@/mixins/focusRing"
import visuallyHidden from "@/mixins/visuallyHidden"
import margin from "@/mixins/margin"
import alignSelf from "@/mixins/alignSelf"

const sizes = {
  default: { width: 40, height: 20, knob: 14 },
  small: { width: 34, height: 20, knob: 13 },
  compact: { width: 26, height: 16, knob: 9 },
}

const dimensions = ({ size }) => sizes[size] || sizes.default
const dimension = key => props => getSizeBy(dimensions(props)[key] / 8)(props)
const inset = props =>
  (dimensions(props).height - (props.variant === "outline" ? 3 : 2) - dimensions(props).knob) / 2
const knobInset = props => getSizeBy(inset(props) / 8)(props)
const knobTravel = props =>
  getSizeBy((dimensions(props).width - dimensions(props).height) / 8)(props)

export const ToggleContainer = styled.div`
  display: block;
  box-sizing: border-box;
  width: ${dimension("width")};
  height: ${dimension("height")};
`

// Visually hidden instead of display:none so the switch stays reachable by keyboard.
export const HiddenToggleInput = styled.input.attrs({
  type: "checkbox",
})`
  ${visuallyHidden}
`

export const StyledLabel = styled.label`
  ${margin}
  ${alignSelf}
  position: relative;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  ${({ disabled, variant }) => disabled && variant !== "outline" && "opacity: 0.4;"}
`

const getTrackFill = ({ checked, colored, checkedColor }) => {
  if (!checked) return getColor("mainBackground")
  return getColor((colored && checkedColor) || "primary")
}

const getKnobColor = ({ colored, checked, uncheckedColor, defaultColor }) => {
  if (checked) return getColor("bright")
  // iconColor keeps the light knob dark slate and stays grey in dark, where controlFocused is pure white.
  if (!colored) return getColor(defaultColor || "iconColor")
  return getColor(uncheckedColor || "iconColor")
}

export const StyledToggle = styled.div`
  box-sizing: border-box;
  width: ${dimension("width")};
  height: ${dimension("height")};
  background: ${getTrackFill};
  border: 1px solid ${getColor("textLite")};
  ${props => props.checked && `border-color: ${getTrackFill(props)(props)};`}
  border-radius: 100px;
  transition:
    background-color 140ms ease-out,
    border-color 140ms ease-out;

  display: block;
  position: relative;

  -webkit-tap-highlight-color: transparent;
  flex-shrink: 0;
  cursor: pointer;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  &:after {
    display: block;
    position: absolute;
    content: "";
    width: ${dimension("knob")};
    height: ${dimension("knob")};
    border-radius: 50%;
    left: ${knobInset};
    top: ${knobInset};
    transform: ${props => (props.checked ? `translateX(${knobTravel(props)})` : "none")};
    transition:
      transform 140ms ease-out,
      background-color 140ms ease-out;
    background-color: ${getKnobColor};
  }

  ${({ disabled }) =>
    !disabled &&
    css`
      ${StyledLabel}:hover & {
        border-color: ${props => (props.checked ? getColor("primaryHover") : getColor("text"))};
        ${props => props.checked && `background: ${getColor("primaryHover")(props)};`}
      }
    `}

  ${HiddenToggleInput}:focus-visible + & {
    ${focusRingOutline}
  }

  ${({ withTransition }) =>
    withTransition === false &&
    css`
      transition: none;

      &:after {
        transition: none;
      }
    `}

  ${({ variant, checked, disabled }) =>
    variant === "outline" &&
    css`
      background: ${checked ? getColor("segmentedAccentText") : getColor(["transparent", "full"])};
      opacity: ${disabled ? 0.4 : 1};
      cursor: ${disabled ? "not-allowed" : "pointer"};
      pointer-events: auto;
      border-width: ${getSizeBy(0.1875)};
      border-color: ${getColor(checked ? "segmentedAccentText" : "controlBorder")};
      border-radius: ${getSizeBy(12.5)};

      ${HiddenToggleInput}:focus-visible + & {
        outline-color: ${getColor("segmentedFocus")};
      }

      &:after {
        background-color: ${getColor(checked ? "buttonNeutralText" : "controlBorder")};
      }

      ${!disabled &&
      css`
        ${StyledLabel}:hover & {
          border-color: ${getColor(checked ? "segmentedAccentText" : "textFocus")};
          ${checked &&
          css`
            background: ${getColor("segmentedAccentText")};
          `}
        }
      `}
    `}

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:after {
      transition: none;
    }
  }
`

export const LabelText = styled.span`
  ${({ right, labelGap, ...props }) => {
    const gap = labelGap === undefined ? `${getSizeUnit(props)}px` : getSizeBy(labelGap / 2)(props)
    return right ? `margin-left: ${gap};` : `margin-right: ${gap};`
  }}
`
