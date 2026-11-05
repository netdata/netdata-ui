import React, { useEffect, useState } from "react"
import { Checkbox } from "."
import Flex from "@/components/templates/flex"
import { MockedCheckboxList } from "./checkbox.mock"

export const Basic = args => {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setChecked(args.checked)
  }, [args.checked])

  return <Checkbox {...args} onChange={setChecked} checked={checked} />
}

export const States = () => (
  <Flex gap={6}>
    <Checkbox checked={false} label="Unchecked" />
    <Checkbox checked label="Checked" />
    <Checkbox indeterminate label="Indeterminate" />
    <Checkbox checked={false} disabled label="Disabled" />
    <Checkbox checked disabled label="Disabled checked" />
    <Checkbox checked={false} checkboxProps={{ error: true }} label="Error" />
  </Flex>
)

export const List = () => <MockedCheckboxList />

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A checkbox for independent yes/no choices and list selection. It is controlled and supports an indeterminate state for partial selections.",
      },
    },
  },
  args: {
    checked: false,
    disabled: false,
    indeterminate: false,
    label: "label",
    labelPosition: "left",
  },
  argTypes: {
    checked: {
      description: "Whether the box is checked. The component is controlled.",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "undefined" } },
      control: "boolean",
    },
    disabled: {
      description: "Dims the control to 40% and ignores clicks.",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "undefined" } },
      control: "boolean",
    },
    indeterminate: {
      description: "Shows the partial mark, for a parent of a partly selected list.",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "undefined" } },
      control: "boolean",
    },
    label: {
      description: "Text beside the box.",
      table: { type: { summary: "ReactNode" }, defaultValue: { summary: "undefined" } },
      control: "text",
    },
    labelPosition: {
      description: "Side of the box the label sits on.",
      table: { type: { summary: '"left" | "right"' }, defaultValue: { summary: "right" } },
      options: ["left", "right"],
      control: { type: "radio" },
    },
    Label: {
      description: "Component used to render the label.",
      table: { type: { summary: "ComponentType" }, defaultValue: { summary: "Text" } },
      control: false,
    },
    labelProps: {
      description: "Props passed to the label component.",
      table: { type: { summary: "object" }, defaultValue: { summary: "undefined" } },
      control: "object",
    },
    checkboxProps: {
      description: "Props for the box element, e.g. { error: true }.",
      table: { type: { summary: "object" }, defaultValue: { summary: "{}" } },
      control: "object",
    },
    iconProps: {
      description: "Props for the check icon.",
      table: { type: { summary: "object" }, defaultValue: { summary: "undefined" } },
      control: "object",
    },
    onChange: {
      description: "Called with the new checked value and the click event.",
      table: { type: { summary: "(checked: boolean, event) => void" } },
      action: "onChange",
    },
  },
}
