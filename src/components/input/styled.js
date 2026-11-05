import styled, { css } from "styled-components"
import { Icon } from "@/components/icon"
import Flex from "@/components/templates/flex"
import background from "@/components/templates/mixins/background"
import { TextMicro, TextSmall } from "@/components/typography"
import { getColor, getSizeBy, getValidatedControlColor } from "@/theme/utils"
import { fieldFocusRing } from "@/mixins/focusRing"
import { controlHeight, controlFontSize } from "@/mixins/controlSize"

const disabledCursorSupport = css`
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`

// TextInput's own size names: "tiny" (legacy) and "compact" are the dense step; "small" and the
// default "large" are the 28px default, so the ladder's "large" is never reached through `size`.
const fieldSizeOf = size => (size === "tiny" || size === "compact" ? "compact" : "default")
const fieldPadding = size => (fieldSizeOf(size) === "compact" ? [0, 2] : [0, 2.5])
const fieldFontSize = props => controlFontSize(fieldSizeOf(props.size))(props)

// Slots in 8px units: a 16px icon with 6px either side, and room for the length indicator.
const iconSlot = 3.5
const indicatorSlot = 3

const errorFocusRing = css`
  &:focus-visible {
    border-color: ${getColor("error")};
    box-shadow: inset 0 0 0 1px ${getColor("error")};
  }
`

// Ghost field: no fill at rest so it sits on any card; the surface comes up on hover and focus.
const ghostBackground = ["transparent", "full"]

const ownFocusSurface = css`
  &:focus-visible {
    ${background}
  }
`

export const Input = styled(Flex).attrs(props => ({
  round: 1,
  as: "input",
  background: ghostBackground,
  width: "100%",
  border: props.error ? "error" : "controlBorder",
  _hover: {
    border: props.error ? "error" : "inputBorderHover",
    background: props.disabled ? undefined : "elementBackground",
  },
  padding: fieldPadding(props.size),
  height: controlHeight(fieldSizeOf(props.size))(props),
  ...props,
}))`
  font-family: inherit;
  font-size: ${fieldFontSize};
  line-height: ${getSizeBy(2)};
  color: ${({ disabled, hasValue }) =>
    hasValue ? getColor("text") : disabled ? getColor("placeholder") : getColor("textLite")};
  ${props => props.hasIconLeft && `padding-left: ${getSizeBy(iconSlot)(props)};`}
  ${props =>
    (props.hasIconRight || props.hasIndicator) &&
    `padding-right: ${getSizeBy(
      props.hasIconRight && props.hasIndicator ? iconSlot + indicatorSlot : iconSlot
    )(props)};`}
  ${({ textAlign }) => (textAlign ? `text-align: ${textAlign};` : "")}
  ${({ disabled }) => disabled && "opacity: 0.4;"}
  transition:
    background-color 120ms ease-out,
    border-color 120ms ease-out,
    box-shadow 160ms ease-out;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  ${fieldFocusRing}
  ${props => props.background !== ghostBackground && ownFocusSurface}
  ${({ error }) => error && errorFocusRing}

  &::placeholder {
    font-size: ${fieldFontSize};
    color: ${getColor("placeholder")};
    font-weight: normal;
    ${({ placeholderProps }) => placeholderProps || null}
  }
  ${disabledCursorSupport};
`

export const StyledLabel = styled.label`
  width: 100%;
  display: block;
  ${disabledCursorSupport};
`
export const LabelText = styled(Flex).attrs(props => ({
  as: TextSmall,
  strong: true,
  alignItems: "center",
  flex: false,
  width: "100%",
  ...props,
}))``

export const StyledIcon = styled(Icon)`
  flex-grow: 0;
  flex-shrink: 0;
`
export const ErrorIcon = styled(StyledIcon)`
  fill: ${getColor("error")};
`

export const SuccessIcon = styled(StyledIcon)`
  fill: ${getColor("success")};
`

export const IconContainer = styled(Flex)``

export const MetaContainer = styled(Flex)`
  flex-flow: row nowrap;
`

export const MetaInfo = styled.span`
  font-size: 12px;
  line-height: 16px;
  overflow: hidden;
  flex-grow: 0;
  flex-shrink: 0;
  color: ${getColor("placeholder")};
`

export const FieldInfo = styled(MetaInfo)`
  color: ${getValidatedControlColor("text")};
  flex-shrink: 1;
`

export const FieldIndicator = styled(TextMicro)`
  font-variant-numeric: tabular-nums;
`
