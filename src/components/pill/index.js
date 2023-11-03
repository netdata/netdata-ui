import React, { forwardRef } from "react"
import { TextBig, Text, TextNano, TextSmall } from "@/components/typography"
import Flex from "@/components/templates/flex"
import PillIcon from "./icon"
import { getPillColor } from "./mixins/colors"
import { PillContainer } from "./styled"

const textComponents = {
  default: Text,
  large: TextBig,
  normal: Text,
  small: TextSmall,
  tiny: TextNano,
}

const Pill = forwardRef(
  (
    {
      children,
      background,
      color,
      "data-testid": testId = "pill",
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
      semi,
      ...rest
    },
    ref
  ) => {
    const iconProps = { color, flavour, hollow, icon, size: iconSize }

    const TextComponent = tiny
      ? textComponents.tiny
      : textSize
      ? textComponents[textSize]
      : textComponents[size] || textComponents.default

    return (
      <PillContainer
        background={background}
        data-testid={testId}
        flavour={flavour}
        gap={1}
        hollow={hollow}
        ref={ref}
        size={size}
        tiny={tiny}
        semi={semi}
        {...rest}
      >
        {!reverse && <PillIcon data-testid={`${testId}-icon-left`} {...iconProps} />}
        {children && (
          <Flex
            as={TextComponent}
            color={color || (hollow ? getPillColor("color", flavour) : "bright")}
            data-testid={`${testId}-text`}
            strong={!normal}
            whiteSpace="nowrap"
            {...textProps}
          >
            {children}
          </Flex>
        )}
        {reverse && <PillIcon data-testid={`${testId}-icon-right`} {...iconProps} />}
      </PillContainer>
    )
  }
)

export default Pill
