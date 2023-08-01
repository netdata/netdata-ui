import React, { useState } from "react"
import MultiRangeInput from "."

export const InputMultiRange = {
  component: () => {
    const [maxValue, setMaxValue] = useState(0.9)
    const [minValue, setMinValue] = useState(0.1)

    console.log(`Component's state is min: ${minValue} and max: ${maxValue}`)

    return (
      <MultiRangeInput
        data-testid="multiRangeSlider"
        initMax={maxValue}
        initMin={minValue}
        min={0}
        max={1}
        onChange={({ max, min }) => {
          setMaxValue(max)
          setMinValue(min)
          console.log(`You changed max to: ${max} and min to: ${min}`)
        }}
        step={0.00000000000001}
      />
    )
  },
}

export default {
  component: MultiRangeInput,
}
