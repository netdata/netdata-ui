import styled, { css } from "styled-components"
import { Icon } from "../icon"
import { getColor, getSizeBy, getValidatedControlColor, getSizeUnit } from "../../theme/utils"
import { controlReset, borderRadius, controlFocused } from "../../mixins"
import { InputProps } from "./input"
// @ts-ignore
const disabledCursorSupport = css<any>`
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`

export const StyledContainer = styled.div`
  position: relative;
  min-width: 144px;
  width: 100%;
`

export const StyledInput = styled.input<InputProps>`
  ${controlReset}
  ${borderRadius}
  height: 38px;
  width: 100%;
  flex-grow: 0;
  padding: ${getSizeBy()};
  ${({ iconLeft }) => iconLeft && "padding-left: 0"};
  ${({ iconRight }) => iconRight && "padding-right: 0"};
  font-size: 14px;
  line-height: 18px;
  color: ${({ disabled }) => (disabled ? getColor("border") : getColor("text"))};
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

export const StyledLabel = styled.label<{ disabled?: boolean }>`
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

export const InputContainer = styled.div<{
  focused: boolean
  disabled?: boolean
  error?: boolean | string
  success?: boolean | string
}>`
  width: 100%;
  height: 40px;
  ${borderRadius}
  border: 1px solid ${getValidatedControlColor()};
  ${({ focused }) => focused && controlFocused};
  display: flex;
  flex-flow: row nowrap;
  &:hover {
    ${controlFocused};
  }
  ${disabledCursorSupport};
`

export const StyledIcon = styled(Icon)<{ success?: boolean }>`
  flex-grow: 0;
  flex-shrink: 0;
`
export const ErrorIcon = styled(Icon)`
  fill: ${getColor("error")};
`

export const SuccessIcon = styled(StyledIcon)`
  fill: ${getColor("success")};
`

export const IconContainer = styled.div<{ disabled?: boolean }>`
  ${borderRadius}
  height: 38px;
  width: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ disabled }) => disabled && `background: ${getColor("mainBackgroundDisabled")}`};
`

export const MetaContainer = styled.div`
  height: 40px;
  width: 100%;
  max-width: 100%;
  padding: ${({ theme }) => {
    const sizeUnit = getSizeUnit({ theme }) as number
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

export const FieldInfo = styled(MetaInfo)<{
  error?: boolean | string
  success?: boolean | string
}>`
  color: ${getValidatedControlColor("text")};
  flex-shrink: 1;
`
