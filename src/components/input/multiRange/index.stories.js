import React, { useEffect, useState } from "react"
import Flex from "@/components/templates/flex"
import MultiRangeInput from "."

export const InputMultiRange = args => {
  const [maxValue, setMaxValue] = useState(args.initMax)
  const [minValue, setMinValue] = useState(args.initMin)

  useEffect(() => {
    setMaxValue(args.initMax)
    setMinValue(args.initMin)
  }, [args.initMax, args.initMin])

  return (
    <Flex width="400px">
      <MultiRangeInput
        {...args}
        initMax={maxValue}
        initMin={minValue}
        onChange={({ max, min }) => {
          setMaxValue(max)
          setMinValue(min)
        }}
      />
    </Flex>
  )
}

export default {
  component: MultiRangeInput,
  args: {
    initMax: 100,
    initMin: 0,
    max: 100,
    min: 0,
    step: 1,
  },
  argTypes: {
    initMax: { control: "number" },
    initMin: { control: "number" },
    max: { control: "number" },
    min: { control: "number" },
    step: { control: "number" },
    onChange: { action: "onChange" },
    onInput: { action: "onInput" },
  },
}
