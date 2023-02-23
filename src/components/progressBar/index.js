import React, { forwardRef } from "react"
import Box from "src/components/templates/box"
import Flex from "src/components/templates/flex"

const ProgressBar = forwardRef(
  (
    {
      background = "nodeBadgeBackground",
      className,
      color = "text",
      containerWidth = "100%",
      height = 2,
      value,
      width,
      ...rest
    },
    ref
  ) => {
    value = Array.isArray(value) ? value : [value || { width, color }]

    return (
      <Flex
        background={background}
        border={{ side: "all", color: background }}
        className={className}
        data-testid="progressBar"
        height={height}
        ref={ref}
        round="2px"
        width={containerWidth}
        {...rest}
      >
        {value.map(({ color, width }, index) =>
          width === "0%" ? null : (
            <Box
              background={color}
              border={{ side: "all", color }}
              data-testid={`progressBar-progress${width}`}
              height="100%"
              key={`${width}-${index}`}
              position="relative"
              round="2px"
              width={width}
            />
          )
        )}
      </Flex>
    )
  }
)

export default ProgressBar
