import React, { useMemo, useRef, useCallback } from "react"
import Flex from "@/components/templates/flex"
import { TextMicro } from "@/components/typography"
import { Input, LabelText } from "./styled"
import Autocomplete from "./autocomplete"
import { mergeRefs } from "@/utils"

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
  const ref = useRef()
  const autocompleteMenuRef = useRef()

  const onKeyDown = useCallback(
    e => {
      if (autocompleteMenuRef.current && ["ArrowDown", "ArrowUp"].includes(e.key)) {
        autocompleteMenuRef.current.focus()
      }
    },
    [autocompleteMenuRef?.current]
  )

  const onAutocompleteEscape = useCallback(() => {
    if (ref?.current) {
      ref.current.focus()
    }
  }, [ref])

  const autocompleteInputProps = useMemo(
    () =>
      autocompleteProps
        ? {
            "aria-autocomplete": "list",
            "aria-controls": "autocomplete-list",
            onKeyDown,
          }
        : {},
    [autocompleteProps, onKeyDown]
  )

  return (
    <Flex
      gap={0.5}
      column
      className={className}
      position="relative"
      {...containerStyles}
      as="label"
    >
      {typeof label === "string" ? <LabelText size={size}>{label}</LabelText> : label}
      <Flex position="relative" {...inputContainerStyles}>
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
          ref={mergeRefs(inputRef, ref)}
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
        ref={autocompleteMenuRef}
        value={value}
        onEsc={onAutocompleteEscape}
        autocompleteProps={autocompleteProps}
        onInputChange={props.onChange}
      />
    </Flex>
  )
}
