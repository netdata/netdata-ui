import React, { useRef, useMemo } from "react"
import Flex from "@/components/templates/flex"
import { TextMicro } from "@/components/typography"
import { Input, LabelText } from "./styled"
import Autocomplete from "./autocomplete"

const Error = ({ error }) => {
  const errorMessage = error === true ? "invalid" : error

  return typeof errorMessage === "string" ? (
    <TextMicro color="errorText">{errorMessage}</TextMicro>
  ) : (
    !!errorMessage && errorMessage
  )
}

export const TextInput = ({
  error,
  disabled,
  iconLeft,
  iconRight,
  name,
  onFocus,
  onBlur,
  className,
  hint,
  fieldIndicator,
  placeholder = "",
  label,
  value,
  inputRef,
  size = "large",
  containerStyles,
  inputContainerStyles,
  hideErrorMessage,
  autocompleteProps,
  ...props
}) => {
  const inputContainerRef = useRef()

  const autocompleteInputProps = useMemo(
    () =>
      autocompleteProps
        ? {
            "aria-autocomplete": "list",
            "aria-controls": "autocomplete-list",
          }
        : {},
    []
  )

  return (
    <Flex gap={0.5} column className={className} {...containerStyles} as="label">
      {typeof label === "string" ? <LabelText size={size}>{label}</LabelText> : label}
      <Flex ref={inputContainerRef} position="relative" {...inputContainerStyles}>
        {iconLeft && (
          <Flex position="absolute" left={1} top={0} bottom={0} alignItems="center">
            {iconLeft}
          </Flex>
        )}
        <Input
          disabled={disabled}
          placeholder={placeholder}
          onBlur={onBlur}
          onFocus={onFocus}
          name={name}
          aria-label={name}
          hasIconLeft={!!iconLeft}
          hasIconRight={!!iconRight}
          hasIndicator={!!fieldIndicator}
          type="text"
          value={value}
          size={size}
          ref={inputRef}
          error={error}
          hasValue={!!value}
          {...autocompleteInputProps}
          {...props}
        />

        {(!!iconRight || !!fieldIndicator) && (
          <Flex position="absolute" right={1} top={0} bottom={0} alignItems="center" gap={1}>
            {!!fieldIndicator && <TextMicro color="textLite">{fieldIndicator}</TextMicro>}
            {!!iconRight && iconRight}
          </Flex>
        )}
      </Flex>
      {typeof hint === "string" ? <TextMicro color="textLite">{hint}</TextMicro> : !!hint && hint}
      {!hideErrorMessage ? <Error error={error} /> : null}
      <Autocomplete
        value={value}
        autocompleteProps={autocompleteProps}
        tagretRef={inputContainerRef}
      />
    </Flex>
  )
}
