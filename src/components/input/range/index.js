import React, { useState } from "react"
import { InputRange as StyledInputRange } from "./styled"

const InputRange = ({ max = 100, min = 0, step = 1, value = 0, ...rest }) => {
  const getBackgroundSize = () => ({ backgroundSize: `${(value * 100) / max}% 100%` })

  return (
    <StyledInputRange
      data-testid="rangeInput"
      max={max}
      min={min}
      step={step}
      style={getBackgroundSize()}
      type="range"
      value={value}
      {...rest}
    />
  )
}

export default InputRange
