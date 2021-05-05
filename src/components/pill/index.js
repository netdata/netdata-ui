import React, { forwardRef, useCallback } from "react"
import { TextMicro } from "src/components/typography"
import { Icon } from "src/components/icon"
import Container from "./container"

const Pill = forwardRef(({ children, background, color, hollow, icon, reverse, ...rest }, ref) => {
  const { flavour } = rest

  const renderIcon = useCallback(() => {
    if (!icon) return null
    if (typeof icon !== "string") return icon

    return (
      <Icon
        width="14px"
        height="14px"
        name={icon}
        color={color ? color : hollow ? ["pill", "color", flavour] : "bright"}
      />
    )
  }, [icon, color, flavour])

  return (
    <Container background={background} hollow={hollow} ref={ref} {...rest} gap={1}>
      {!reverse && renderIcon()}
      <TextMicro color={color ? color : hollow ? ["pill", "color", flavour] : "bright"} strong>
        {children}
      </TextMicro>
      {reverse && renderIcon()}
    </Container>
  )
})

export default Pill
