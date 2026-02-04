import React, { useState } from "react"
import { ButtonGroup } from "."

export const RadioButtonGroup = args => {
  const [value, setValue] = useState(args.value)

  return <ButtonGroup items={args.items} value={value} buttonProps={args} onChange={setValue} />
}

export const MultiButtonGroup = args => {
  const [value, setValue] = useState([args.value])

  return (
    <ButtonGroup items={args.items} value={value} isMulti buttonProps={args} onChange={setValue} />
  )
}

export default {
  component: ButtonGroup,
  tags: ["autodocs"],
  args: {
    items: [
      { label: "One", value: "1" },
      { label: "Two", value: "2" },
      { label: "Three", value: "3" },
    ],
    value: "1",
    buttonProps: {},
  },
  argTypes: {
    value: { control: "text" },
  },
}
