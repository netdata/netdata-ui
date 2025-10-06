import React, { Fragment } from "react"
import Flex from "@/components/templates/flex"
import { Text } from "@/components/typography"
import { Icon } from "@/components/icon"

const rotateMap = { right: 1, bottom: 2, left: 3 }
const iconAlignmentProps = { alignSelf: "center" }

const Container = ({
  children,
  align,
  margin = [1],
  background = "tooltip",
  ref,
  iconContainerProps = {},
  ...rest
}) => {
  const hasIconContainerProps = !!Object.keys(iconContainerProps)
  const IconContainer = hasIconContainerProps ? Flex : Fragment

  return (
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
        <IconContainer {...iconAlignmentProps} {...iconContainerProps}>
          <Icon
            name="triangle"
            color={background}
            rotate={rotateMap[align]}
            height="8px"
            width="8px"
            data-testid="drop-arrow"
            {...(hasIconContainerProps ? {} : iconAlignmentProps)}
          />
        </IconContainer>
      )}
    </Flex>
  )
}

export default Container
