import React, { ChangeEvent, MutableRefObject, FocusEvent, ReactNode, KeyboardEvent } from "react"
import { usePreviousDistinct } from "react-use"
import { MarginProps, AlignSelfProps } from "src/mixins/types"
import {
  StyledInput,
  StyledLabel,
  InputContainer,
  SuccessIcon,
  IconContainer,
  StyledContainer,
  MetaContainer,
  MetaInfo,
  FieldInfo,
  LabelRow,
  ErrorIcon,
} from "./styled"
import { InstantFeedback } from "./types"
import { useFocusedState } from "./use-focused-state"

type CallBackRef = (input: any) => void

export interface InputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: FocusEvent) => void
  onBlur?: (e: FocusEvent) => void
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
  value: string
  inputRef?: MutableRefObject<HTMLInputElement | null> | CallBackRef
  disabled?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
  name?: string
  placeholder?: string
  autoFocus?: boolean
}

export interface MetaOptions {
  error?: boolean | string
  success?: boolean | string
  touched?: boolean
  isDirty?: boolean
  instantFeedback?: InstantFeedback
  prevValue: string | undefined
  value: string
  focused?: boolean
}

export interface ComponentProps extends MarginProps, AlignSelfProps {
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
  handleMetaDisplay?: (metaOptions: MetaOptions) => boolean
}

export type TextInputProps = InputProps & ComponentProps

const defaultHandleMetaDisplay = ({
  isDirty,
  instantFeedback,
  value,
  prevValue,
  error,
  success,
  touched,
}: MetaOptions) =>
  touched ||
  Boolean(instantFeedback === "all" && isDirty) ||
  Boolean(instantFeedback === "positiveFirst" && isDirty && success) ||
  Boolean(
    instantFeedback === "positiveFirst" &&
      isDirty &&
      error &&
      prevValue &&
      value.length < prevValue.length
  ) // if user starts to erase entered data, we provide negative feedback

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
  handleMetaDisplay = defaultHandleMetaDisplay,
  ...props
}: TextInputProps) => {
  const [focused, handleFocus, handleBlur] = useFocusedState({ onBlur, onFocus })

  const prevValue = usePreviousDistinct(value)

  const metaDisplayed = handleMetaDisplay({
    isDirty,
    instantFeedback,
    value,
    prevValue,
    error,
    success,
    touched,
    focused,
  })

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
              <ErrorIcon name="cross_s" />
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
            {(isError && errorMessage) || (isSuccess && successMessage) || fieldMessage}
          </FieldInfo>
          <MetaInfo>{fieldIndicator}</MetaInfo>
        </MetaContainer>
      )}
    </StyledContainer>
  )
}
