import React from "react"
import { Button, IconButton } from "."
import { iconsList } from "@/components/icon"

const icons = Object.keys(iconsList)

export const Basic = args => <Button {...args} />

export const BaseIconButton = args => (
  <IconButton
    {...args}
    label=""
    cursor="pointer"
    icon="chevron_left"
    iconSize="small"
    tooltip="Previous"
  />
)

export default {
  component: Button,
  tags: ["autodocs"],
  args: {
    onClick: () => alert("clicked"),
    flavour: "default",
    id: "some-id",
    className: "some-classname",
    label: "My button",
    loadingLabel: "Loading button",
    icon: icons[0],
    isLoading: false,
    disabled: false,
    danger: false,
    warning: false,
    large: false,
    neutral: false,
  },
  argTypes: {
    flavour: {
      options: ["default", "hollow", "borderless"],
      control: { type: "radio" },
    },
    id: { control: "text" },
    className: { control: "text" },
    label: { control: "text" },
    loadingLabel: { control: "text" },
    icon: { options: icons, type: "select" },
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" },
    danger: { control: "boolean" },
    warning: { control: "boolean" },
    large: { control: "boolean" },
    neutral: { control: "boolean" },
  },
}
