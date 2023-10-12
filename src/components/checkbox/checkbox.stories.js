import React, { useState } from "react"
import { Checkbox } from "."

export const ControlledCheckbox = {
  component: (...args) => {
    const [checked, setChecked] = useState(false)
    const handleChange = e => {
      setChecked(e.currentTarget.checked)
    }
    return <Checkbox {...args} onChange={handleChange} checked={checked} />
  },
}

export default {
  component: Checkbox,
  args: {
    checked: false,
    disabled: false,
    indeterminate: false,
    label: "label",
    labelPosition: "left",
  },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    indeterminate: { control: "boolean" },
    label: { control: "text" },
    labelPosition: {
      options: ["left", "right"],
      control: { type: "radio" },
    },
  },
}
