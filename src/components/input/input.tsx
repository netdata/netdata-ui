import React, { ChangeEvent, MutableRefObject, FocusEvent, ReactNode } from "react"
import { usePreviousDistinct } from "react-use"
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
import { InstantFeedback } from "./types"
import { useFocusedState } from "./use-focused-state"

type CallBackRef = (input: any) => void

export interface InputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: FocusEvent) => void
  onBlur?: (e: FocusEvent) => void
  value: string
  inputRef?: MutableRefObject<any> | CallBackRef
  disabled?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
  name?: string
  placeholder?: string
  autoFocus?: boolean
}

export interface ComponentProps {
  fieldMessage?: string
  error?: boolean | string
  success?: boolean | string
  touched?: boolean
  isDirty?: boolean
  instantFeedback?: InstantFeedback
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
  isDirty,
  value,
  inputRef,
  ...props
}: TextInputProps) => {
  const [focused, handleFocus, handleBlur] = useFocusedState({ onBlur, onFocus })

  const prevValue = usePreviousDistinct(value)

  const metaDisplayed =
    touched ||
    (instantFeedback === "all" && isDirty) ||
    (instantFeedback === "positiveFirst" && isDirty && success) ||
    (instantFeedback === "positiveFirst" &&
      isDirty &&
      error &&
      prevValue &&
      value.length < prevValue.length) // if user starts to erase entered data, we provide negative feedback
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
            value={value}
            ref={inputRef}
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
