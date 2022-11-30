import styled from "styled-components"
import { Icon } from "src/components/icon"
import Box from "src/components/templates/box"
import { getSizeUnit, getValidatedControlColor } from "src/theme/utils"
import margin from "src/mixins/margin"
import alignSelf from "src/mixins/alignSelf"

import Flex from "src/components/templates/flex"

export const CheckboxContainer = styled(Box).attrs({
  height: "16px",
  width: "16px",
})`
  box-sizing: border-box;
`

export const StyledIcon = styled(Icon).attrs({
  height: "inherit",
  width: "inherit",
})`
  flex-grow: 0;
  flex-shrink: 0;
  fill: ${getValidatedControlColor("primary", "accent")};
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

export const StyledCheckbox = styled(Flex)`
  box-sizing: border-box;
  transition: all 150ms;

  ${StyledIcon} {
    visibility: ${props => {
      if (props.indeterminate) return "visible"
      return props.checked ? "visible" : "hidden"
    }};
`

export const StyledLabel = styled.label`
  ${margin}
  ${alignSelf}
  position: relative;
  cursor: ${({ disabled }) => (disabled ? "auto" : "pointer")};
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`

export const LabelText = styled.span`
  ${({ right, ...props }) =>
    right ? `margin-left: ${getSizeUnit(props)}px;` : `margin-right: ${getSizeUnit(props)}px;`};
  ${({ disabled }) => disabled && "opacity: 0.4;"};
`
