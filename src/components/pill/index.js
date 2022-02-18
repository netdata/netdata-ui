import React, { forwardRef } from "react"
import { Text, TextMicro, TextSmall } from "src/components/typography"
import Container from "./container"
import { getPillColor } from "./mixins/colors"
import PillIcon from "./icon"

const TextComponents = {
  default: TextMicro,
  large: Text,
  normal: Text,
  small: TextSmall,
}

const Pill = forwardRef(
  ({ children, background, color, flavour, hollow, icon, iconSize, normal, reverse, size, textSize, tiny, ...rest }, ref) => {
    const iconProps = { color, flavour, hollow, icon, size: iconSize }

    if (tiny) return <Container tiny background={background} flavour={flavour} hollow={hollow} ref={ref} {...rest} />

    const Text = textSize ? TextComponents[textSize] : (TextComponents[size] || TextComponents.default)

    return (
      <Container background={background} flavour={flavour} gap={1} hollow={hollow} ref={ref} size={size} {...rest}>
        {!reverse && <PillIcon {...iconProps} />}
        {children && (
          <Text
            color={color || (hollow ? getPillColor("color", flavour) : "bright")}
            strong={!normal}
            whiteSpace="nowrap"
          >
            {children}
          </Text>
        )}
        {reverse && <PillIcon {...iconProps} />}
      </Container>
    )
  }
)

export default Pill
