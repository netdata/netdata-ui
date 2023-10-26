import React from "react"
import { iconsList } from "./iconsList"
import { Icon } from "."

export const Basic = args => <Icon {...args} />

export default {
  component: Icon,
  args: {
    name: Object.keys(iconsList)[0],
    size: "small",
    disabled: false,
  },
  argTypes: {
    name: {
      options: Object.keys(iconsList),
      control: { type: "select" },
    },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
    disabled: { control: "boolean" },
  },
}
