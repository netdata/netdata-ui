import React, { useCallback } from "react"
import Flex from "@/components/templates/flex"
import { TextSmall } from "@/components/typography"
import Select from "."

const options = [
  { label: "One", value: "one" },
  { label: "Two", value: "two" },
  { label: "Three", value: "three" },
  { label: "Four", value: "four" },
  { label: "Five", value: "five" },
]

export const Basic = args => {
  const onChange = useCallback(e => console.log(`On change: ${JSON.stringify(e)}`), [])

  const onCreateOption = useCallback(e => console.log(`On create: ${JSON.stringify(e)}`), [])

  return <Select onChange={onChange} onCreateOption={onCreateOption} {...args} />
}

const withIcons = [
  { label: "Nodes", value: "nodes", icon: "nodes" },
  { label: "Alerts", value: "alerts", icon: "alarm" },
  { label: "Disabled option", value: "off", isDisabled: true },
]

const Labeled = ({ label, ...props }) => (
  <Flex column gap={1} width="220px">
    <TextSmall strong>{label}</TextSmall>
    <Select options={options} {...props} />
  </Flex>
)

export const States = () => (
  <Flex gap={4} alignItems="start" flexWrap>
    <Labeled label="Empty" placeholder="Select..." />
    <Labeled label="Filled" defaultValue={options[1]} />
    <Labeled label="Clearable" defaultValue={options[2]} isClearable />
    <Labeled label="Disabled" defaultValue={options[1]} isDisabled />
    <Labeled label="Autofocus (focus ring)" autoFocus defaultValue={options[0]} />
  </Flex>
)

export const OpenMenu = () => (
  <Flex gap={4} alignItems="start" height="260px">
    <Labeled label="Selected Two" defaultValue={options[1]} menuIsOpen />
    <Labeled label="Icons + disabled option" options={withIcons} menuIsOpen />
  </Flex>
)

export const Multi = () => (
  <Flex gap={4} alignItems="start" flexWrap>
    <Labeled label="Multi" isMulti defaultValue={[options[0], options[1]]} />
    <Labeled
      label="Locked chip"
      isMulti
      defaultValue={[{ ...options[0], isDisabled: true }, options[2]]}
    />
    <Labeled label="Multi disabled" isMulti isDisabled defaultValue={[options[0]]} />
  </Flex>
)

export const Creatable = () => (
  <Labeled label="Type to create" isCreatable placeholder="Add a label..." />
)

const t = (summary, def) => ({ type: { summary }, defaultValue: { summary: def } })

export default {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A themed react-select dropdown with a virtualized option list. Use it to pick one or several values from a known list; it accepts all react-select props.",
      },
    },
  },
  args: {
    options,
    isCreatable: false,
    isMulti: false,
  },
  argTypes: {
    options: { description: "Options as { label, value, icon?, isDisabled? }.", table: t("Option[]", "undefined"), control: "object" },
    isCreatable: { description: "Lets users type and create a new option.", table: t("boolean", "false"), control: "boolean" },
    isMulti: { description: "Allows selecting several options.", table: t("boolean", "false"), control: "boolean" },
    isClearable: { description: "Shows a clear button.", table: t("boolean", "false"), control: "boolean" },
    isDisabled: { description: "Fades the select to 40% and blocks input.", table: t("boolean", "false"), control: "boolean" },
    placeholder: { description: "Text shown with no selection.", table: t("string", '"Select..."'), control: "text" },
    menuIsOpen: { description: "Forces the menu open or closed.", table: t("boolean", "undefined"), control: "boolean" },
    "data-ga": { description: "Analytics attribute; parts get the sub-component name appended.", table: t("string", "undefined"), control: "text" },
    "data-testid": { description: "Test id prefix for sub-components.", table: t("string", "undefined"), control: "text" },
    onChange: { description: "Called with the selected option(s).", table: t("(value) => void", "undefined"), action: "onChange" },
    onCreateOption: { description: "Called with the typed string when isCreatable creates an option.", table: t("(input: string) => void", "undefined"), action: "onCreateOption" },
  },
}
