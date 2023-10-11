import styled from "styled-components"
import { Icon } from "@/components/icon"
import Box from "@/components/templates/box"
import Flex from "@/components/templates/flex"
import { getSizeUnit, getValidatedControlColor } from "@/theme/utils"

export const CheckboxContainer = styled(Box).attrs({
  height: "16px",
  width: "16px",
})`
  box-sizing: border-box;
`

export const StyledIcon = styled(Icon).attrs({
  height: "16px",
  width: "16px",
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

export const StyledLabel = styled(Flex).attrs(props => ({
  as: "label",
  position: "relative",
  alignItems: "center",
  ...props,
}))`
  cursor: ${({ disabled }) => (disabled ? "auto" : "pointer")};
`

export const LabelText = styled.span`
  ${({ right, ...props }) =>
    right ? `margin-left: ${getSizeUnit(props)}px;` : `margin-right: ${getSizeUnit(props)}px;`};
  ${({ disabled }) => disabled && "opacity: 0.4;"};
`
