import React from "react"
import { Button, IconButton, ButtonGroup, useRovingFocus } from "."
import Select from "@/components/select"
import Search from "@/components/search"
import Flex from "@/components/templates/flex"
import { TextInput } from "@/components/input"
import { TextSmall } from "@/components/typography"
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

const tones = [
  { name: "primary", props: {} },
  { name: "neutral", props: { neutral: true } },
  { name: "danger", props: { danger: true } },
  { name: "warning", props: { warning: true } },
  { name: "custom colour", props: { color: "primaryAI" } },
]

const states = [
  { name: "rest", props: {} },
  { name: "active", props: { active: true } },
  { name: "disabled", props: { disabled: true } },
  { name: "loading", props: { isLoading: true, loadingLabel: "Saving" } },
]

const Cell = ({ caption, children }) => (
  <Flex column gap={1} alignItems="start">
    {children}
    <TextSmall color="textLite">{caption}</TextSmall>
  </Flex>
)

export const StateMatrix = () => (
  <Flex column gap={6}>
    {["default", "hollow", "borderless", "link"].map(flavour => (
      <Flex column gap={3} key={flavour}>
        <TextSmall strong>{flavour}</TextSmall>
        {tones.map(tone => (
          <Flex gap={4} alignItems="end" key={tone.name}>
            {states.map(state => (
              <Cell key={state.name} caption={`${tone.name} · ${state.name}`}>
                <Button
                  label="Add node"
                  icon="plus"
                  flavour={flavour}
                  {...tone.props}
                  {...state.props}
                />
              </Cell>
            ))}
          </Flex>
        ))}
      </Flex>
    ))}
  </Flex>
)

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Critical", value: "critical" },
]

// One control ladder: every row lines up at 24 (compact), 28 (default) or 32 (large).
const ladderRows = [
  { name: "compact · 24px · 12px text", button: { compact: true }, field: { size: "compact" } },
  { name: "default · 30px · 13px text", button: {}, field: {} },
  { name: "large · 32px · 14px text", button: { large: true }, field: { height: 8 } },
]

export const SizesAndAlignment = () => (
  <Flex column gap={4}>
    {ladderRows.map(row => (
      <Flex column gap={1} key={row.name}>
        <TextSmall color="textLite">{row.name}</TextSmall>
        <Flex gap={2} alignItems="center">
          <Search placeholder="Filter nodes" {...row.field} />
          {row.name.startsWith("default") ? (
            <Select options={statusOptions} defaultValue={statusOptions[0]} />
          ) : (
            <TextInput
              placeholder="Node name"
              name="node"
              value=""
              onChange={() => {}}
              {...row.field}
            />
          )}
          <Button label="Apply" {...row.button} />
          <Button flavour="hollow" neutral label="Cancel" {...row.button} />
          <Button flavour="link" label="View docs" {...row.button} />
          <Button flavour="hollow" neutral icon="gear" {...row.button} />
          <IconButton icon="gear" tooltip="Settings" {...row.button} />
        </Flex>
      </Flex>
    ))}
  </Flex>
)

export const LinkFlavour = () => (
  <Flex gap={4} alignItems="center">
    <Button flavour="link" label="View docs" />
    <Button flavour="link" label="Remove node" danger />
    <Button flavour="link" label="Review limits" warning />
    <Button flavour="link" label="Show all" neutral />
    <Button flavour="link" label="Disabled" disabled />
  </Flex>
)

export const IconButtons = () => (
  <Flex gap={4} alignItems="end">
    <Cell caption="rest">
      <IconButton icon="chevron_left" tooltip="Previous" />
    </Cell>
    <Cell caption="expanded">
      <IconButton icon="gear" aria-expanded="true" tooltip="Settings" />
    </Cell>
    <Cell caption="disabled">
      <IconButton icon="trashcan" disabled tooltip="Delete" />
    </Cell>
    <Cell caption="disabled · focusableWhenDisabled">
      <IconButton
        icon="trashcan"
        disabled
        focusableWhenDisabled
        tooltip="Managed by a parent; delete it there"
        aria-label="Delete alert"
      />
    </Cell>
    <Cell caption="primary borderless">
      <IconButton icon="plus" neutral={false} tooltip="Add" />
    </Cell>
  </Flex>
)

export const IconButtonSizes = () => (
  <Flex gap={4} alignItems="end">
    <Cell caption="compact · 24px">
      <IconButton icon="gear" tooltip="Settings" compact />
    </Cell>
    <Cell caption="default · 30px">
      <IconButton icon="gear" tooltip="Settings" />
    </Cell>
    <Cell caption="large · 32px">
      <IconButton icon="gear" tooltip="Settings" large />
    </Cell>
  </Flex>
)

const toolbarActions = [
  { icon: "refresh", label: "Refresh alerts" },
  { icon: "filter", label: "Filter by node" },
  { icon: "download", label: "Export alerts" },
  { icon: "gear", label: "Alert settings" },
]

// Tab into the toolbar once, then use the arrow keys, Home and End.
export const RovingToolbar = () => {
  const { getItemProps } = useRovingFocus({ count: toolbarActions.length })
  return (
    <Flex role="toolbar" aria-label="Alerts actions" gap={1} alignItems="center">
      {toolbarActions.map(({ icon, label }, index) => (
        <IconButton
          key={icon}
          icon={icon}
          tooltip={label}
          aria-label={label}
          {...getItemProps(index)}
        />
      ))}
    </Flex>
  )
}

export const Segmented = () => (
  <Flex column gap={3}>
    <ButtonGroup
      items={[
        { label: "1h", value: "1h" },
        { label: "6h", value: "6h" },
        { label: "24h", value: "24h" },
        { label: "7d", value: "7d" },
      ]}
      value="6h"
    />
    <ButtonGroup>
      <Button label="Only" />
    </ButtonGroup>
    <ButtonGroup>
      <Button flavour="hollow" label="Edit" />
      <Button flavour="hollow" label="Copy" />
    </ButtonGroup>
  </Flex>
)

export default {
  title: "Components/Button",
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
    compact: false,
    neutral: false,
  },
  argTypes: {
    flavour: {
      options: ["default", "hollow", "borderless", "link"],
      control: { type: "radio" },
      description:
        "`link` is text-only in the tone colour, underlined on hover, at the same heights.",
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
    large: { control: "boolean", description: "32px tall, 14px text, 16px side padding." },
    compact: { control: "boolean", description: "24px tall, 12px text, for dense toolbars." },
    neutral: { control: "boolean" },
    focusableWhenDisabled: {
      control: "boolean",
      description:
        "IconButton only: when disabled, use aria-disabled so it stays focusable and its tooltip reachable.",
    },
  },
}
