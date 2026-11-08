import React from "react"
import styled from "styled-components"
import { TextBig, Text, TextNano, TextSmall } from "@/components/typography"
import Flex from "@/components/templates/flex"
import { StatusDot } from "./dot"
import PillIcon from "./icon"
import { getPillColor } from "./mixins/colors"
import { getPillLook, getTextColorType } from "./mixins/look"
import { PillContainer } from "./styled"

export { StatusDot } from "./dot"
export { default as StatusWord } from "./statusWord"
export { default as MarkCounts } from "./markCounts"

const textComponents = {
  default: Text,
  large: TextBig,
  normal: Text,
  small: TextSmall,
  tiny: TextNano,
}

const medium = Component => styled(Component)`
  font-weight: 500;
`

const softTextComponents = Object.fromEntries(
  Object.entries(textComponents).map(([key, Component]) => [key, medium(Component)])
)

// Bright on staleSemi reaches only 3.7:1, so that text is bold.
const needsBoldText = (look, flavour) => look === "semi" && flavour === "stale"

const Pill = ({
  children,
  appearance,
  background,
  color,
  "data-testid": testId = "pill",
  dot,
  filled,
  flavour,
  hollow,
  icon,
  iconSize,
  normal = true,
  reverse,
  size,
  textSize,
  tiny,
  textProps,
  wrapChildren = true,
  semi,
  ref,
  ...rest
}) => {
  const look = getPillLook({ filled, hollow, semi })
  const toneColor = getPillColor(getTextColorType(look), flavour)
  const textColor = color || toneColor
  const strong = !normal || (!color && needsBoldText(look, flavour))
  const iconProps = { color: textColor, icon, size: iconSize }

  const components = look === "soft" && !strong ? softTextComponents : textComponents
  const TextComponent = tiny
    ? components.tiny
    : textSize
      ? components[textSize]
      : components[size] || components.default

  return (
    <PillContainer
      background={background}
      appearance={appearance}
      color={!wrapChildren || appearance === "subtle" ? textColor : undefined}
      data-testid={testId}
      flavour={flavour}
      fontWeight={!wrapChildren && strong ? 600 : undefined}
      gap={1}
      look={look}
      ref={ref}
      size={size}
      tiny={tiny}
      wrapChildren={wrapChildren}
      {...rest}
    >
      {!reverse && <PillIcon data-testid={`${testId}-icon-left`} {...iconProps} />}
      {dot && (
        <StatusDot data-testid={`${testId}-dot`} dot={dot} color={textColor} tone={flavour} />
      )}
      {wrapChildren
        ? children && (
            <Flex
              as={TextComponent}
              color={textColor}
              data-testid={`${testId}-text`}
              strong={strong}
              whiteSpace="nowrap"
              {...textProps}
            >
              {children}
            </Flex>
          )
        : children}
      {reverse && <PillIcon data-testid={`${testId}-icon-right`} {...iconProps} />}
    </PillContainer>
  )
}

export default Pill
