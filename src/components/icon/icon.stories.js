import React from "react"
import Flex from "@/components/templates/flex"
import { Text, TextSmall } from "@/components/typography"
import { iconsList } from "./iconsList"
import { Icon } from "."

export const Basic = args => <Icon {...args} />

export const InheritsTextColor = () => (
  <Flex gap={4}>
    <Text color="primary">
      <Icon name="alarm_bell" />
    </Text>
    <Text color="error">
      <Icon name="alarm_bell" />
    </Text>
    <Icon name="alarm_bell" color="text" />
    <Icon name="alarm_bell" color="primary" hoverColor="error" />
    <Icon name="alarm_bell" disabled />
  </Flex>
)

export const Sizes = () => (
  <Flex gap={6} alignItems="end">
    {[
      { caption: "small 14px", props: { size: "small" } },
      { caption: "medium 16px", props: { size: "medium" } },
      { caption: "large 24px", props: { size: "large" } },
      { caption: "custom 32px", props: { width: "32px", height: "32px" } },
    ].map(({ caption, props }) => (
      <Flex key={caption} column gap={1} alignItems="center">
        <Icon name="gear" {...props} />
        <TextSmall color="textLite">{caption}</TextSmall>
      </Flex>
    ))}
  </Flex>
)

export const NameSuffixSizes = () => (
  <Flex gap={6} alignItems="end">
    {[
      { name: "checkmark_s", caption: "_s suffix: small" },
      { name: "gear", caption: "no suffix: medium" },
      { name: "alarm_bell", caption: "no suffix: medium" },
    ].map(({ name, caption }) => (
      <Flex key={name} column gap={1} alignItems="center">
        <Icon name={name} />
        <TextSmall color="textLite">{caption}</TextSmall>
      </Flex>
    ))}
  </Flex>
)

export const States = () => (
  <Flex gap={6}>
    {[
      { caption: "rest", props: {} },
      { caption: "coloured", props: { color: "primary" } },
      { caption: "hover colour", props: { color: "text", hoverColor: "primary" } },
      { caption: "rotate 1 (90deg)", props: { rotate: 1 } },
      { caption: "disabled", props: { disabled: true } },
    ].map(({ caption, props }) => (
      <Flex key={caption} column gap={1} alignItems="center">
        <Icon name="chevron_left" size="large" {...props} />
        <TextSmall color="textLite">{caption}</TextSmall>
      </Flex>
    ))}
  </Flex>
)

const names = Object.keys(iconsList)

export default {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Renders one of the bundled SVG icons by name. Use it for status, actions and navigation cues next to text. Browse all names in the IconsList story.",
      },
    },
  },
  args: {
    name: names[0],
    size: "small",
    disabled: false,
  },
  argTypes: {
    name: {
      description: "Icon name, a key of iconsList. Unknown names render nothing.",
      options: names,
      control: { type: "select" },
      table: { type: { summary: "string" } },
    },
    size: {
      description: "Preset size. Without it, names ending in _s are small, _l large, others medium.",
      options: ["small", "medium", "large"],
      control: { type: "radio" },
      table: { type: { summary: "small | medium | large" }, defaultValue: { summary: "from name" } },
    },
    color: {
      description: "Theme colour key. Without it the icon inherits the current text colour.",
      control: "text",
      table: { type: { summary: "string | string[]" }, defaultValue: { summary: "currentColor" } },
    },
    hoverColor: {
      description: "Theme colour key applied on hover.",
      control: "text",
      table: { type: { summary: "string | string[]" } },
    },
    disabled: {
      description: "Fades the icon to 40% and removes pointer events.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    rotate: {
      description: "Rotation in quarter turns (1 is 90deg).",
      control: { type: "number", min: 0, max: 3 },
      table: { type: { summary: "number" } },
    },
    width: {
      description: "Overrides the preset width.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    height: {
      description: "Overrides the preset height.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    sx: {
      description: "styled-system css object for extra styles.",
      control: false,
      table: { type: { summary: "object" } },
    },
    onClick: {
      description: "Click handler.",
      action: "onClick",
      control: false,
      table: { type: { summary: "(e: MouseEvent) => void" } },
    },
    title: {
      description: "Native title attribute.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    "data-testid": {
      description: "Test id of the svg.",
      control: false,
      table: { type: { summary: "string" } },
    },
  },
}
