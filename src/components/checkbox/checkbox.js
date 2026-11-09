import React, { useEffect } from "react"
import useForwardRef from "@/hooks/useForwardRef"
import { Text } from "@/components/typography"
import { Icon } from "@/components/icon"
import Box from "@/components/templates/box"
import Flex from "@/components/templates/flex"
import { HiddenCheckboxInput, Checkbox as StyledCheckbox } from "./styled"

export const Checkbox = (
  {
    checked,
    disabled,
    iconProps,
    checkboxProps = {},
    inputProps = {},
    variant = "default",
    indeterminate,
    Label = Text,
    label,
    labelProps,
    labelPosition = "right",
    onChange,
    ...rest
  },
  ref
) => {
  const [inputRef, setInputRef] = useForwardRef(ref)

  // "mixed" is only exposed through the IDL property; aria-checked is not allowed on a native checkbox.
  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = !!indeterminate
  }, [indeterminate])

  const onClick = e => {
    // Cancelling the input's own click (Space key) would undo the controlled checked value after render.
    if (e.target !== inputRef.current) e.preventDefault()

    if (disabled) return
    if (variant === "filled" && e.target !== inputRef.current) inputRef.current?.focus()

    onChange?.(!checked, e)
  }

  return (
    <Flex
      as="label"
      position="relative"
      alignItems="center"
      gap={2}
      cursor={disabled ? "auto" : "pointer"}
      opacity={disabled ? 0.4 : undefined}
      rowReverse={labelPosition === "left"}
      data-testid="checkbox"
      disabled={disabled}
      {...rest}
      onClick={onClick}
    >
      <Box width="16px" height="16px">
        <HiddenCheckboxInput
          data-testid="checkbox-input"
          {...inputProps}
          ref={setInputRef}
          disabled={disabled}
          checked={!!checked}
          readOnly
          {...(indeterminate && { "data-indeterminate": true })}
          data-checked={checked}
        />
        <StyledCheckbox
          data-testid="styled-checkbox"
          data-state={indeterminate ? "mixed" : checked ? "checked" : "unchecked"}
          disabled={disabled}
          variant={variant === "default" ? undefined : variant}
          {...checkboxProps}
        >
          {variant !== "filled" && (!!checked || !!indeterminate) && (
            <Icon
              name={indeterminate ? "checkmark_partial_s" : "checkmark_s"}
              width="16px"
              height="16px"
              color="primary"
              {...iconProps}
            />
          )}
        </StyledCheckbox>
      </Box>
      {label && (
        <Text as={Label} {...labelProps}>
          {label}
        </Text>
      )}
    </Flex>
  )
}
