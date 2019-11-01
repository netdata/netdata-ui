import React, { ChangeEvent, MutableRefObject, FocusEvent, ReactNode } from "react"
import {
  StyledInput,
  StyledLabel,
  InputContainer,
  StyledIcon,
  SuccessIcon,
  IconContainer,
  StyledContainer,
  MetaContainer,
  MetaInfo,
  FieldInfo,
  LabelRow,
} from "./styled"
import { useFocusedState } from "./use-focused-state"

export interface InputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: FocusEvent) => void
  onBlur?: (e: FocusEvent) => void
  value: string
  ref?: MutableRefObject<HTMLInputElement>
  disabled?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
  name?: string
  placeholder?: string
}

export interface ComponentProps {
  fieldMessage?: string
  error?: boolean | string
  success?: boolean | string
  touched?: boolean
  instantFeedback?: boolean
  className?: string
  fieldIndicator?: string | ReactNode
  metaShrinked?: boolean
  label?: string
}

export type TextInputProps = InputProps & ComponentProps

export const TextInput = ({
  error,
  success,
  touched,
  disabled,
  instantFeedback,
  iconLeft,
  iconRight,
  name,
  onFocus,
  onBlur,
  className,
  fieldMessage,
  fieldIndicator,
  metaShrinked,
  placeholder = "",
  label,
  ...props
}: TextInputProps) => {
  const [focused, handleFocus, handleBlur] = useFocusedState({ onBlur, onFocus })

  const metaDisplayed = touched || instantFeedback
  const isSuccess = metaDisplayed && success
  const isError = metaDisplayed && error
  const errorMessage = isError && error !== true && error
  const successMessage = isSuccess && success !== true && success

  return (
    <StyledContainer className={className}>
      <StyledLabel disabled={disabled}>
        {label && (
          <LabelRow>
            <span>{label}</span>
          </LabelRow>
        )}
        <InputContainer focused={focused} success={isSuccess} error={isError} disabled={disabled}>
          {iconLeft && <IconContainer disabled={disabled}>{iconLeft}</IconContainer>}
          <StyledInput
            {...props}
            disabled={disabled}
            placeholder={placeholder}
            onBlur={handleBlur}
            onFocus={handleFocus}
            name={name}
            aria-label={name}
            iconLeft={iconLeft}
            iconRight={iconRight}
            type="text"
          />
          {iconRight && <IconContainer disabled={disabled}>{iconRight}</IconContainer>}
          {metaDisplayed && error && (
            <IconContainer disabled={disabled}>
              <StyledIcon name="cross_s" />
            </IconContainer>
          )}
          {metaDisplayed && success && (
            <IconContainer disabled={disabled}>
              <SuccessIcon name="checkmark_s" />
            </IconContainer>
          )}
        </InputContainer>
      </StyledLabel>

      {!metaShrinked && (
        <MetaContainer>
          <FieldInfo success={isSuccess} error={isError}>
            {errorMessage || successMessage || fieldMessage}
          </FieldInfo>
          <MetaInfo>{fieldIndicator}</MetaInfo>
        </MetaContainer>
      )}
    </StyledContainer>
  )
}
