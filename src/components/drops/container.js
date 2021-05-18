import React from "react"
import Flex from "src/components/templates/flex"
import { Text } from "src/components/typography"
import { Icon } from "src/components/icon"

const rotateMap = { right: 1, bottom: 2, left: 3 }

const Container = ({ children, align, margin = [1], background = "tooltip", ...rest }) => (
  <Flex
    column={align === "top"}
    columnReverse={align === "bottom"}
    rowReverse={align === "right"}
    margin={margin}
  >
    <Flex background={background} padding={[1, 2]} round column {...rest}>
      {typeof children === "string" ? <Text color="bright">{children}</Text> : children}
    </Flex>
    {align && (
      <Icon
        name="triangle"
        alignSelf="center"
        color={background}
        rotate={rotateMap[align]}
        height="8px"
        width="8px"
        data-testid="drop-arrow"
      />
    )}
  </Flex>
)

export default Container
