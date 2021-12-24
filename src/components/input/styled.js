import styled, { css } from "styled-components"
import { Icon } from "src/components/icon"
import { getColor, getValidatedControlColor, getSizeUnit } from "src/theme/utils"
import { controlReset, controlFocused } from "src/mixins"
import margin from "src/mixins/margin"
import alignSelf from "src/mixins/alignSelf"
import round from "src/mixins/round"

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

export const InputContainer = styled.div.attrs({ round: true })`
  width: 100%;
  height: ${({ height }) => height};
  padding: ${({ padding }) => padding};
  ${round}
  border: 1px solid ${getValidatedControlColor()};
  ${({ focused }) => focused && controlFocused};
  display: flex;
  flex-flow: row nowrap;
  &:hover {
    ${controlFocused};
  }
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

export const IconContainer = styled.div.attrs({ round: true })`
  ${round}
  height: 100%;
  width: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ disabled }) =>
    disabled ? getColor("mainBackgroundDisabled") : getColor("mainBackground")};
`

export const MetaContainer = styled.div`
  height: 40px;
  width: 100%;
  max-width: 100%;
  padding: ${({ theme }) => {
    const sizeUnit = getSizeUnit({ theme })
    return `${sizeUnit}px 0 ${sizeUnit}px ${sizeUnit}px`
  }};
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
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
