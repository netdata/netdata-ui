import React, { useCallback, useState } from "react"
import { ButtonGroup } from "."

export const RadioButtonGroup = args => {
  const [checked, setChecked] = useState(args.checked)

  return (
    <ButtonGroup
      items={args.items.map(item => ({ ...item }))}
      checked={checked}
      buttonProps={args}
      onChange={setChecked}
    />
  )
}

export const MultiButtonGroup = args => {
  const [checked, setChecked] = useState([args.checked])

  const onChange = useCallback(
    value => {
      setChecked(prev => {
        if (prev.includes(value)) return prev.filter(v => v !== value)
        return [...prev, value]
      })
    },
    [setChecked]
  )

  return (
    <ButtonGroup
      items={args.items.map(item => ({ ...item }))}
      checked={checked}
      buttonProps={args}
      onChange={onChange}
    />
  )
}

export default {
  component: ButtonGroup,
  tags: ["autodocs"],
  args: {
    items: [
      { label: "One", value: 1 },
      { label: "Two", value: 2 },
      { label: "Three", value: 3 },
    ],
    checked: 1,
    buttonProps: {},
  },
  argTypes: {
    checked: { control: "text" },
  },
}
