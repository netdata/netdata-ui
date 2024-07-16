import React, { useRef } from "react"
import Flex from "@/components/templates/flex"
import { TextMicro } from "@/components/typography"
import Drop from "@/components/drops/drop"
import { Input, LabelText } from "./styled"
import { useEffect } from "react"
import { useState } from "react"

const Error = ({ error }) => {
  const errorMessage = error === true ? "invalid" : error

  return typeof errorMessage === "string" ? (
    <TextMicro color="errorText">{errorMessage}</TextMicro>
  ) : (
    !!errorMessage && errorMessage
  )
}

const Suggestions = ({ suggestions = [] } = {}) => {
  return (
    <ul role="listbox">
      {suggestions.map(({ value, label }) => (
        <li key={value} role="option">
          {label}
        </li>
      ))}
    </ul>
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
  const [autocompleteOpen, setAutocompleteOpen] = useState()
  const { suggestions = [] } = autocompleteProps || {}

  useEffect(() => {
    if (suggestions.length) {
      setAutocompleteOpen(!!value.length)
    }
  }, [suggestions, value, setAutocompleteOpen])

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
      {autocompleteOpen && inputContainerRef?.current && (
        <Drop
          width={60}
          target={inputContainerRef.current}
          align={{ top: "bottom", left: "left" }}
          animation
          background="inputBg"
          margin={[1, 0, 0]}
          round={1}
          close={() => {}}
          onClickOutside={() => {}}
          onEsc={() => {}}
        >
          <Suggestions suggestions={suggestions} />
        </Drop>
      )}
    </Flex>
  )
}
