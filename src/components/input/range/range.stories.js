import React, { useEffect, useState } from "react"
import RangeInput from "."

export const InputRange = args => {
  const [value, setValue] = useState(args.value)

  useEffect(() => {
    setValue(args.value)
  }, [args.value])

  return (
    <RangeInput
      {...args}
      value={value}
      onChange={e => {
        setValue(e.target.value)
      }}
    />
  )
}

export default {
  component: RangeInput,
  args: {
    value: 0,
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
