import React from "react"
import { InputRange as StyledInputRange } from "./styled"

const InputRange = ({ max = 100, min = 0, step = 1, value = 0, ...rest }) => (
  <StyledInputRange
    data-testid="rangeInput"
    max={max}
    min={min}
    step={step}
    type="range"
    value={value}
    {...rest}
  />
)

export default InputRange
