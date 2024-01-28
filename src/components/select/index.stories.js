import React, { useCallback } from "react"
import Select from "."

const options = [
  { label: "One", value: "one" },
  { label: "Two", value: "two" },
  { label: "Three", value: "three" },
  { label: "Four", value: "four" },
  { label: "Five", value: "five" },
]

export const Basic = args => {
  const onChange = useCallback(e => console.log(`On change: ${JSON.stringify(e)}`), [])

  const onCreateOption = useCallback(e => console.log(`On create: ${JSON.stringify(e)}`), [])

  return <Select onChange={onChange} onCreateOption={onCreateOption} {...args} />
}

export default {
  component: Select,
  args: {
    options,
    isCreatable: false,
    isMulti: false,
  },
  argTypes: {
    isCreatable: { control: "boolean" },
    isMulti: { control: "boolean" },
  },
}
