import React, { Fragment } from "react"
import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { Text } from "@/components/typography"
import { Icon } from "@/components/icon"
import { dropdownRound, floatingDropShadow } from "./dropdownStyles"

const rotateMap = { right: 1, bottom: 2, left: 3 }
const iconAlignmentProps = { alignSelf: "center" }

// Pull the arrow 1px into the bubble so sub-pixel rounding never leaves a seam between them.
const arrowMarginMap = {
  top: [-0.25, 0, 0, 0],
  bottom: [0, 0, -0.25, 0],
  right: [0, -0.25, 0, 0],
  left: [0, 0, 0, -0.25],
}

// A filter shadow follows the bubble and arrow as one shape; box-shadow would skip the arrow.
const Floating = styled(Flex)`
  ${floatingDropShadow}
`

const Bubble = styled(Flex)`
  font-variant-numeric: tabular-nums;
`

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
    <Floating
      ref={ref}
      column={align === "top"}
      columnReverse={align === "bottom"}
      rowReverse={align === "right"}
      margin={margin}
    >
      <Bubble background={background} padding={[1, 2]} round={dropdownRound} column {...rest}>
        {typeof children === "string" ? (
          <Text color={background === "dropdown" ? "text" : "tooltipText"}>{children}</Text>
        ) : (
          children
        )}
      </Bubble>
      {align && (
        <IconContainer {...iconAlignmentProps} {...iconContainerProps}>
          <Icon
            name="triangle"
            color={background}
            rotate={rotateMap[align]}
            height="8px"
            width="8px"
            margin={arrowMarginMap[align]}
            data-testid="drop-arrow"
            {...(hasIconContainerProps ? {} : iconAlignmentProps)}
          />
        </IconContainer>
      )}
    </Floating>
  )
}

export default Container
