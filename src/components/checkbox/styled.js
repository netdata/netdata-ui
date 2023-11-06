import styled from "styled-components"
import Flex from "@/components/templates/flex"

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

export const Checkbox = styled(Flex).attrs(props => ({
  width: "16px",
  height: "16px",
  round: 0.5,
  background: "inputBg",
  backgroundOpacity: props.disabled ? 0.4 : 1,
  alignItems: "center",
  border: props.error ? "error" : "inputBorder",
  _hover: {
    border: props.disabled ? "inputBorder" : props.error ? "errorText" : "inputBorderHover",
  },
  _focus: {
    border: props.disabled ? "inputBorder" : props.error ? "errorText" : "inputBorderFocus",
  },
  ...props,
}))``
