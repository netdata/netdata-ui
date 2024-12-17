import React, { forwardRef } from "react"
import { Text } from "@/components/typography"
import { Icon } from "@/components/icon"
import Box from "@/components/templates/box"
import Flex from "@/components/templates/flex"
import { HiddenCheckboxInput, Checkbox as StyledCheckbox } from "./styled"

export const Checkbox = forwardRef(
  (
    {
      checked,
      disabled,
      iconProps,
      checkboxProps = {},
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
    const onClick = e => {
      e.preventDefault()

      if (disabled) return

      onChange?.(!checked, e)
    }

    return (
      <Flex
        as="label"
        position="relative"
        alignItems="center"
        gap={1}
        cursor={disabled ? "auto" : "pointer"}
        rowReverse={labelPosition === "right"}
        data-testid="checkbox"
        disabled={disabled}
        {...rest}
        onClick={onClick}
      >
        {label && (
          <Text as={Label} opacity={disabled ? 0.4 : 1} {...labelProps}>
            {label}
          </Text>
        )}
        <Box width="16px" height="16px">
          <HiddenCheckboxInput
            data-testid="checkbox-input"
            ref={ref}
            disabled={disabled}
            {...(indeterminate && { "data-indeterminate": true })}
            data-checked={checked}
          />
          <StyledCheckbox data-testid="styled-checkbox" disabled={disabled} {...checkboxProps}>
            {(!!checked || !!indeterminate) && (
              <Icon
                disabled={disabled}
                name={indeterminate ? "checkmark_partial_s" : "checkmark_s"}
                width="16px"
                height="16px"
                color="accent"
                hoverColor="primary"
                {...iconProps}
              />
            )}
          </StyledCheckbox>
        </Box>
      </Flex>
    )
  }
)
