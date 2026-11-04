import styled, { css } from "styled-components"
import { getColor, getSizeBy, getSizeUnit } from "@/theme/utils"
import { focusRingOutline } from "@/mixins/focusRing"
import visuallyHidden from "@/mixins/visuallyHidden"
import margin from "@/mixins/margin"
import alignSelf from "@/mixins/alignSelf"

export const ToggleContainer = styled.div`
  display: block;
  box-sizing: border-box;
  width: ${getSizeBy(5)};
  height: ${getSizeBy(2.5)};
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
  ${({ disabled }) => disabled && "opacity: 0.4;"}
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
  width: ${getSizeBy(5)};
  height: ${getSizeBy(2.5)};
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
    width: ${getSizeBy(1.75)};
    height: ${getSizeBy(1.75)};
    border-radius: 50%;
    left: ${getSizeBy(0.25)};
    top: ${getSizeBy(0.25)};
    transform: ${props => (props.checked ? `translateX(${getSizeBy(2.5)(props)})` : "none")};
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

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:after {
      transition: none;
    }
  }
`

export const LabelText = styled.span`
  ${({ right, ...props }) =>
    right ? `margin-left: ${getSizeUnit(props)}px;` : `margin-right: ${getSizeUnit(props)}px;`}
`
