import React from "react"
import Flex from "@/components/templates/flex"
import { TextMicro } from "@/components/typography"
import { Input, LabelText } from "./styled"

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
  ...props
}) => {
  const errorMessage = error === true ? "invalid" : error

  return (
    <Flex gap={1} column className={className} {...containerStyles} as="label" flex>
      {typeof label === "string" ? <LabelText size={size}>{label}</LabelText> : label}
      <Flex position="relative" gap={1} {...inputContainerStyles}>
        {iconLeft && (
          <Flex position="absolute" left={0} top={0} bottom={0} alignItems="center" padding={[1]}>
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

        {iconRight && (
          <Flex
            position="absolute"
            right={0}
            top={0}
            bottom={0}
            alignItems="center"
            padding={[1]}
            gap={1}
          >
            <span>{fieldIndicator}</span>
            <span>{iconRight}</span>
          </Flex>
        )}
      </Flex>
      {typeof hint === "string" ? <TextMicro color="textLite">{hint}</TextMicro> : !!hint && hint}
      {typeof errorMessage === "string" ? (
        <TextMicro color="errorText">{errorMessage}</TextMicro>
      ) : (
        !!errorMessage && errorMessage
      )}
    </Flex>
  )
}
