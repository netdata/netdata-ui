import React from "react"
import { Segment, Track } from "./styled"

const ProgressBar = ({
  background = "separator",
  className,
  color = "text",
  containerWidth = "100%",
  height = 2,
  value,
  width,
  ref,
  ...rest
}) => {
  value = Array.isArray(value) ? value : [value || { width, color }]

  return (
    <Track
      background={background}
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
          <Segment
            background={color}
            data-testid={`progressBar-progress${width}`}
            height="100%"
            key={`${width}-${index}`}
            position="relative"
            width={width}
            zIndex={index}
          />
        )
      )}
    </Track>
  )
}

export default ProgressBar
