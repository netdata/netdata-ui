import styled from "styled-components"
import { getColor, getSizeUnit } from "src/theme/utils"
import { controlFocused } from "src/mixins"
import margin from "src/mixins/margin"
import alignSelf from "src/mixins/alignSelf"

export const ToggleContainer = styled.div`
  display: block;
  box-sizing: border-box;
  width: 40px;
  height: 20px;
`

export const HiddenToggleInput = styled.input.attrs({
  type: "checkbox",
})`
  display: none;
`

export const StyledToggle = styled.div`
  box-sizing: border-box;
  width: 40px;
  height: 20px;
  background: ${props =>
    props.disabled ? getColor("mainBackgroundDisabled") : getColor("mainBackground")};
  border: 1px solid ${getColor("border")};
  border-radius: 100px;
  transition: all 150ms;

  display: block;
  position: relative;

  -webkit-tap-highlight-color: transparent;
  flex-shrink: 0;
  align-self: flex-start;
  cursor: pointer;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  &:after {
    display: block;
    position: absolute;
    content: "";
    width: 16px;
    height: 16px;
    border-radius: 50%;
    left: 5%;
    top: 50%;
    transform: translateY(-50%);
    transition: left 0.2s ease;
    background-color: ${({ disabled, colored, checked }) => {
      if (disabled) return getColor("disabled")
      if (!colored) return getColor("controlFocused")
      return checked ? getColor("primary") : getColor("error")
    }};
  }

  ${({ checked }) =>
    checked &&
    `
    &:after {
      left: 55%;
    }
  `}

  ${HiddenToggleInput}:focus + & {
    ${controlFocused}
  }
`

export const StyledLabel = styled.label`
  ${margin}
  ${alignSelf}
  position: relative;
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`

export const LabelText = styled.span`
  ${({ right, ...props }) =>
    right ? `margin-left: ${getSizeUnit(props)}px;` : `margin-right: ${getSizeUnit(props)}px;`}
`
