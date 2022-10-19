import React, { useState } from "react"
import { storiesOf } from "@storybook/react"
import RangeInput from "./index"

const rangeStory = storiesOf("Components|Controls/TextRange", module)

rangeStory.add("Input Range", () => {
  const [value, setValue] = useState(0.1)

  return (
    <RangeInput
      data-testid="metricCorrelation-resultsSlider"
      min={0}
      max={1}
      onChange={event => {
        console.log(`You changed ${event.target.value.toString()}`)
      }}
      onClick={() => {
        console.log("You clicked input range")
      }}
      onInput={event => setValue(event.target.value)}
      value={value}
      step={0.00000000000001}
    />
  )
})
