import styled, { css } from "styled-components"
import { Icon } from "src/components/icon"
import { getColor, getValidatedControlColor, getSizeUnit } from "src/theme/utils"
import { controlReset, controlFocused } from "src/mixins"
import margin from "src/mixins/margin"
import alignSelf from "src/mixins/alignSelf"
import round from "src/mixins/round"
import Flex from "src/components/templates/flex"

const disabledCursorSupport = css`
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`

export const StyledContainer = styled.div`
  ${margin}
  ${alignSelf}
  position: relative;
  min-width: 144px;
  width: 100%;
`

export const StyledInput = styled.input.attrs({ round: true })`
  ${controlReset}
  ${round}
  height: 100%;
  width: 100%;
  flex-grow: 0;
  ${({ iconLeft }) => iconLeft && "padding-left: 0"};
  ${({ iconRight }) => iconRight && "padding-right: 0"};
  font-size: 14px;
  line-height: 18px;
  color: ${({ disabled }) => (disabled ? getColor("placeholder") : getColor("border"))};
  background: ${({ disabled }) =>
    disabled ? getColor("mainBackgroundDisabled") : getColor("mainBackground")};

  &::placeholder {
    font-size: 14px;
    line-height: 18px;
    color: ${getColor("placeholder")};
    opacity: 1;
  }
  ${disabledCursorSupport};
`

export const StyledLabel = styled.label`
  width: 100%;
  display: block;
  ${disabledCursorSupport};
`
export const LabelRow = styled.div`
  width: 100%;
  height: 40px;
  flex-shrink: 0;
  flex-grow: 0;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  color: ${getColor("text")};
  display: flex;
  align-items: center;
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
