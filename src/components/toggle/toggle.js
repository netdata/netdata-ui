import { Text } from "@/components/typography"
import { ToggleContainer, HiddenToggleInput, StyledToggle, StyledLabel, LabelText } from "./styled"

const isAccessibilityProp = key => key.startsWith("aria-") || key === "title"

const splitAccessibility = toggleProps =>
  Object.entries(toggleProps).reduce(
    (parts, [key, value]) => {
      parts[isAccessibilityProp(key) ? "accessibility" : "visual"][key] = value
      return parts
    },
    { accessibility: {}, visual: {} }
  )

export const Toggle = ({
  checked,
  disabled,
  className,
  children,
  labelLeft = children,
  labelRight,
  Label = Text,
  labelGap,
  colored = false,
  margin,
  alignSelf,
  toggleProps = {},
  size = "default",
  variant = "default",
  activateOnEnter = false,
  onKeyDown,
  ...props
}) => {
  const { accessibility, visual } = splitAccessibility(toggleProps)

  return (
    <StyledLabel
      className={className}
      margin={margin}
      alignSelf={alignSelf}
      disabled={disabled}
      variant={variant === "default" ? undefined : variant}
    >
      {labelLeft && (
        <LabelText as={Label} labelGap={labelGap} left>
          {labelLeft}
        </LabelText>
      )}
      <ToggleContainer size={size}>
        <HiddenToggleInput
          role="switch"
          disabled={disabled}
          checked={checked}
          {...accessibility}
          {...props}
          onKeyDown={event => {
            onKeyDown?.(event)
            if (activateOnEnter && event.key === "Enter" && !event.defaultPrevented) {
              event.preventDefault()
              if (!event.repeat) event.currentTarget.click()
            }
          }}
        />
        <StyledToggle
          checked={checked}
          disabled={disabled}
          colored={colored}
          size={size}
          variant={variant === "default" ? undefined : variant}
          {...visual}
          aria-hidden="true"
        />
      </ToggleContainer>
      {labelRight && (
        <LabelText as={Label} labelGap={labelGap} right>
          {labelRight}
        </LabelText>
      )}
    </StyledLabel>
  )
}
