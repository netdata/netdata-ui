import styled, { css } from "styled-components"
import { Icon } from "@/components/icon"
import Flex from "@/components/templates/flex"
import { TextSmall, TextMicro } from "@/components/typography"
import { getColor, getValidatedControlColor } from "@/theme/utils"

const disabledCursorSupport = css`
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`

export const Input = styled(Flex).attrs(props => ({
  round: 0.5,
  as: "input",
  background: "inputBg",
  backgroundOpacity: props.disabled ? 0.4 : 1,
  width: "100%",
  border: props.error ? "error" : props.hasValue ? "text" : "inputBorder",
  _hover: {
    border: props.error ? "errorText" : "inputBorderHover",
  },
  _focus: {
    border: props.error ? "errorText" : "inputBorderFocus",
  },
  padding: props.size === "tiny" ? [0.5, 1] : props.size === "small" ? [1, 2] : [2, 3],
  height: props.size === "tiny" ? 6 : props.size === "small" ? 7 : 9,
  ...props,
}))`
  font-size: ${({ size }) => (size === "tiny" ? "11px" : size === "small" ? "12px" : "14px")};
  color: ${({ disabled, hasValue }) =>
    hasValue ? getColor("text") : disabled ? getColor("placeholder") : getColor("textLite")};
  ${({ hasIconLeft }) => hasIconLeft && "padding-left: 24px;"}
  ${({ hasIconRight, hasIndicator }) =>
    (hasIconRight || hasIndicator) && `padding-right: ${hasIconRight && hasIndicator ? 48 : 24}px;`}

  &::placeholder {
    font-size: ${({ size }) => (size === "tiny" ? "11px" : size === "small" ? "12px" : "14px")};
    color: ${getColor("placeholder")};
    opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
    font-weight: normal;
    ${({ placeholderProps }) => placeholderProps || null}
  }
  ${disabledCursorSupport};
`

export const StyledLabel = styled.label`
  width: 100%;
  display: block;
  ${disabledCursorSupport};
`
export const LabelText = styled(Flex).attrs(props => ({
  as: props.size === "tiny" ? TextMicro : TextSmall,
  strong: true,
  alignItems: "center",
  flex: false,
  width: "100%",
  ...props,
}))``

export const StyledIcon = styled(Icon)`
  flex-grow: 0;
  flex-shrink: 0;
`
export const ErrorIcon = styled(StyledIcon)`
  fill: ${getColor("error")};
`

export const SuccessIcon = styled(StyledIcon)`
  fill: ${getColor("success")};
`

export const IconContainer = styled(Flex)``

export const MetaContainer = styled(Flex)`
  flex-flow: row nowrap;
`

export const MetaInfo = styled.span`
  font-size: 12px;
  line-height: 16px;
  overflow: hidden;
  flex-grow: 0;
  flex-shrink: 0;
  color: ${getColor("placeholder")};
`

export const FieldInfo = styled(MetaInfo)`
  color: ${getValidatedControlColor("text")};
  flex-shrink: 1;
`
