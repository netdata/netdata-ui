import React, { forwardRef } from "react"
import { Text, TextMicro, TextSmall } from "src/components/typography"
import PillIcon from "./icon"
import { getPillColor } from "./mixins/colors"
import { PillContainer } from "./styled"

const TextComponents = {
  default: TextMicro,
  large: Text,
  normal: Text,
  small: TextSmall,
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
      normal,
      reverse,
      size,
      textSize,
      tiny,
      ...rest
    },
    ref
  ) => {
    const iconProps = { color, flavour, hollow, icon, size: iconSize }

    if (tiny)
      return (
        <PillContainer
          background={background}
          data-testid={`${testId}-tiny`}
          flavour={flavour}
          hollow={hollow}
          ref={ref}
          tiny
          {...rest}
        />
      )

    const Text = textSize
      ? TextComponents[textSize]
      : TextComponents[size] || TextComponents.default

    return (
      <PillContainer
        background={background}
        data-testid={testId}
        flavour={flavour}
        gap={1}
        hollow={hollow}
        ref={ref}
        size={size}
        {...rest}
      >
        {!reverse && <PillIcon data-testid={`${testId}-icon-left`} {...iconProps} />}
        {children && (
          <Text
            color={color || (hollow ? getPillColor("color", flavour) : "bright")}
            data-testid={`${testId}-text`}
            strong={!normal}
            whiteSpace="nowrap"
          >
            {children}
          </Text>
        )}
        {reverse && <PillIcon data-testid={`${testId}-icon-right`} {...iconProps} />}
      </PillContainer>
    )
  }
)

export default Pill
