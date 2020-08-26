import styled from "styled-components"
import { Icon } from "../icon"
import { getValidatedControlColor, getColor, getSizeUnit } from "../../theme/utils"
import { controlFocused } from "../../mixins"

export const CheckboxContainer = styled.div`
  display: block;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
`

export const StyledIcon = styled(Icon)<{ disabled?: boolean }>`
  flex-grow: 0;
  flex-shrink: 0;
  fill: ${getValidatedControlColor("primary")};
`

export const HiddenCheckboxInput = styled.input.attrs({
  type: "checkbox",
})`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

export const StyledCheckbox = styled.div<{
  checked: boolean
  disabled?: boolean
  indeterminate?: boolean
}>`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background: ${({ disabled }) =>
    disabled ? getColor("mainBackgroundDisabled") : getColor("mainBackground")};
  border: 1px solid ${getValidatedControlColor()};
  transition: all 150ms;

  ${HiddenCheckboxInput}:focus + & {
    ${controlFocused}
  }

  ${StyledIcon} {
    visibility: ${props => {
      if (props.indeterminate) return "visible"
      return props.checked ? "visible" : "hidden"
    }};
  }
`

export const StyledLabel = styled.label`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`

export const LabelText = styled.span<{ left?: boolean; right?: boolean }>`
  ${({ right, ...props }) =>
    right ? `margin-left: ${getSizeUnit(props)}px;` : `margin-right: ${getSizeUnit(props)}px;`}
`

export const AccessibleArea = styled.div`
  position: absolute;
  top: -5px;
  left: -5px;
  height: 30px;
  width: calc(100% + 10px);
`
