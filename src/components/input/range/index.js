import React, { forwardRef } from "react"
import { InputRange as StyledInputRange } from "./styled"

const InputRange = forwardRef(({ max = 100, min = 0, step = 1, value = 0, ...rest }, ref) => (
  <StyledInputRange
    data-testid="rangeInput"
    max={max}
    min={min}
    step={step}
    type="range"
    value={value}
    ref={ref}
    {...rest}
  />
))

export default InputRange
