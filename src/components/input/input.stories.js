import React from "react"
import { Icon } from "@/components/icon"
import { TextInput } from "."
import { useState } from "react"

export const WithIcons = args => (
  <TextInput
    {...args}
    iconLeft={<Icon key="nodes" name="nodes" color="textLite" size="small" />}
    iconRight={<Icon key="nodes" name="nodes" color="textLite" size="small" />}
  />
)

export const Basic = args => <TextInput {...args} />

export const WithAutocomplete = () => {
  const [value, setValue] = useState("")
  const autocompleteProps = {
    suggestions: [
      { value: "one", label: "one" },
      { value: "two", label: "two" },
      { value: "three", label: "three" },
    ],
  }

  return (
    <TextInput
      value={value}
      onChange={e => setValue(e.target.value)}
      autocompleteProps={autocompleteProps}
    />
  )
}

export default {
  component: TextInput,
  args: {
    error: "",
    disabled: false,
    iconLeft: "",
    iconRight: "",
    name: "",
    className: "",
    hint: "Do this and that",
    fieldIndicator: 180,
    placeholder: "Placeholder text",
    label: "My label",
    value: "",
    size: "small",
    containerStyles: {},
    inputContainerStyles: {},
  },
  argTypes: {
    error: { control: "text" },
    disabled: { control: "boolean" },
    iconLeft: {
      options: ["", "L"],
      control: { type: "radio" },
    },
    iconRight: {
      options: ["", "R"],
      control: { type: "radio" },
    },
    name: { control: "text" },
    className: { control: "text" },
    hint: { control: "text" },
    fieldIndicator: 180,
    placeholder: { control: "text" },
    label: { control: "text" },
    value: { control: "text" },
    size: {
      options: ["tiny", "small"],
      control: { type: "radio" },
    },
  },
}
