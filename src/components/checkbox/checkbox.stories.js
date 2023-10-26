import React, { useEffect, useState } from "react"
import { Checkbox } from "."

export const Basic = args => {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setChecked(args.checked)
  }, [args.checked])

  return <Checkbox {...args} onChange={setChecked} checked={checked} />
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
