import React from "react"
import Flex from "src/components/templates/flex"
import { Text } from "src/components/typography"
import { Icon } from "src/components/icon"

const rotateMap = { right: 1, bottom: 2, left: 3 }

const Container = ({ children, align, ...rest }) => (
  <Flex
    column={align === "top"}
    columnReverse={align === "bottom"}
    rowReverse={align === "right"}
    margin={[1]}
  >
    <Flex background={["black", "pure"]} padding={[1, 2]} round column {...rest}>
      {typeof children === "string" ? <Text color={["white", "pure"]}>{children}</Text> : children}
    </Flex>
    {align && (
      <Icon
        name="triangle"
        alignSelf="center"
        rotate={rotateMap[align]}
        height="8px"
        width="8px"
        data-testid="tooltip-arrow"
      />
    )}
  </Flex>
)

export default Container
