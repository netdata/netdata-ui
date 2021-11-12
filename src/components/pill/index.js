import React, { forwardRef } from "react"
import { TextMicro } from "src/components/typography"
import Container from "./container"
import getPillColor from "./colors"
import PillIcon from "./icon"

const Pill = forwardRef(
  ({ children, background, color, hollow, icon, reverse, tiny, ...rest }, ref) => {
    const { flavour } = rest

    if (tiny) return <Container tiny background={background} hollow={hollow} ref={ref} {...rest} />

    return (
      <Container background={background} hollow={hollow} ref={ref} {...rest} gap={1}>
        {!reverse && <PillIcon icon={icon} color={color} hollow={hollow} flavour={flavour} />}
        <TextMicro
          color={color ? color : hollow ? getPillColor("color", flavour) : "bright"}
          strong
        >
          {children}
        </TextMicro>
        {reverse && <PillIcon icon={icon} color={color} hollow={hollow} flavour={flavour} />}
      </Container>
    )
  }
)

export default Pill
