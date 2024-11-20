import React, { useState, useEffect } from "react"
import { Toggle } from "./toggle"
import { useCallback } from "react"

export const Basic = args => {
  const [checked, setChecked] = useState(false)

  const onChange = useCallback(() => setChecked(prev => !prev), [setChecked])

  useEffect(() => {
    setChecked(args.checked)
  }, [args.checked])

  return <Toggle {...args} checked={checked} onChange={onChange} />
}

export default {
  component: Toggle,
  args: {
    checked: false,
    disabled: false,
    colored: true,
    labelLeft: "Left",
    labelRight: "Right",
  },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    colored: { control: "boolean" },
    labelLeft: { control: "text" },
    labelRight: { control: "text" },
    toggleProps: { control: "object" },
  },
}
