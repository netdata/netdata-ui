import React, { forwardRef } from "react"
import Flex from "@/components/templates/flex"
import { Text } from "@/components/typography"
import { Icon } from "@/components/icon"

const rotateMap = { right: 1, bottom: 2, left: 3 }

const Container = forwardRef(
  ({ children, align, margin = [1], background = "tooltip", ...rest }, ref) => (
    <Flex
      ref={ref}
      column={align === "top"}
      columnReverse={align === "bottom"}
      rowReverse={align === "right"}
      margin={margin}
    >
      <Flex background={background} padding={[1, 2]} round column {...rest}>
        {typeof children === "string" ? <Text color="tooltipText">{children}</Text> : children}
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
)

export default Container
