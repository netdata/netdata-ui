import styled, { css } from "styled-components"
import { Icon } from "@/components/icon"
import { getColor, getValidatedControlColor } from "@/theme/utils"
import { controlReset } from "@/mixins"
import margin from "@/mixins/margin"
import alignSelf from "@/mixins/alignSelf"
import round from "@/mixins/round"
import width from "@/components/templates/mixins/width"
import Flex from "@/components/templates/flex"

const disabledCursorSupport = css`
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`

export const StyledContainer = styled.div`
  ${margin}
  ${alignSelf}
  position: relative;
  ${width}
`

export const StyledInput = styled.input.attrs({ round: true })`
  ${controlReset}
  ${round}
  height: 100%;
  width: 100%;
  font-weight: normal;
  flex-grow: 0;
  ${({ iconLeft }) => iconLeft && "padding-left: 0"};
  ${({ iconRight }) => iconRight && "padding-right: 0"};
  font-size: ${({ size }) => (size === "tiny" ? "12px" : "14px")};
  line-height: 18px;
  color: ${({ disabled }) => getColor(disabled ? "placeholder" : "textDescription")};
  background: ${({ disabled }) => getColor(disabled ? "inputBg" : "mainBackground")};
  opacity: ${({ disabled }) => (disabled ? "0.4" : "1")};
  &::placeholder {
    font-size: ${({ size }) => (size === "tiny" ? "12px" : "14px")};
    line-height: 18px;
    color: ${getColor("placeholder")};
    opacity: 1;
    font-weight: normal;
  }
  ${disabledCursorSupport};
`

export const StyledLabel = styled.label`
  width: 100%;
  display: block;
  ${disabledCursorSupport};
`
export const LabelRow = styled(Flex).attrs({
  alignItems: "center",
  color: "text",
  flex: false,
  width: "100%",
})`
  font-style: normal;
  font-weight: bold;
  font-size: ${({ size }) => (size === "tiny" ? "12px" : "14px")};
  line-height: 18px;
  margin-bottom: 4px;
`

export const InputContainer = styled(Flex)`
  ${disabledCursorSupport};
`

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
