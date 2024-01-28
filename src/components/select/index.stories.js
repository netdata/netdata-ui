import React from "react"
import Select from "."

const options = [
  { label: "One", value: "one" },
  { label: "Two", value: "two" },
  { label: "Three", value: "three" },
  { label: "Four", value: "four" },
  { label: "Five", value: "five" },
]

export const Basic = args => <Select {...args} />

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
