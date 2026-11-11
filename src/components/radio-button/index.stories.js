import { useState } from "react"
import Flex from "@/components/templates/flex"
import { Checkbox } from "@/components/checkbox"
import { Toggle } from "@/components/toggle"
import RadioButton from "."

export const Basic = args => {
  const [checked, setChecked] = useState(args.checked)
  return <RadioButton {...args} checked={checked} onChange={() => setChecked(true)} />
}

export const States = () => (
  <Flex gap={6}>
    <RadioButton checked={false} onChange={() => {}} label="Unchecked" />
    <RadioButton checked onChange={() => {}} label="Checked" />
    <RadioButton checked={false} disabled onChange={() => {}} label="Disabled" />
    <RadioButton checked disabled onChange={() => {}} label="Disabled checked" />
  </Flex>
)

export const Group = () => {
  const [value, setValue] = useState("avg")
  return (
    <Flex column gap={2}>
      {["avg", "min", "max", "sum"].map(option => (
        <RadioButton
          key={option}
          name="aggregation"
          value={option}
          checked={value === option}
          onChange={() => setValue(option)}
          label={option}
        />
      ))}
    </Flex>
  )
}

export const AlignedWithSiblings = () => (
  <Flex column gap={2}>
    <RadioButton checked onChange={() => {}} label="Per node" />
    <Checkbox checked label="Group by dimension" />
    <Toggle checked onChange={() => {}} labelRight="Auto refresh" />
  </Flex>
)

export default {
  title: "Components/Radio Button",
  component: RadioButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A round option for choosing exactly one value from a short list. Group several with the same name.",
      },
    },
  },
  args: { checked: false, disabled: false, label: "Average" },
  argTypes: {
    checked: {
      description: "Whether this option is selected. The component is controlled.",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "undefined" } },
      control: "boolean",
    },
    disabled: {
      description: "Dims the option to 40% and blocks interaction.",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "undefined" } },
      control: "boolean",
    },
    label: {
      description: "Text beside the radio. Ignored when children are passed.",
      table: { type: { summary: "ReactNode" }, defaultValue: { summary: "undefined" } },
      control: "text",
    },
    children: {
      description: "Custom label content, used instead of label.",
      table: { type: { summary: "ReactNode" }, defaultValue: { summary: "undefined" } },
      control: false,
    },
    name: {
      description: "Native input name; shared by the options of one group.",
      table: { type: { summary: "string" }, defaultValue: { summary: "undefined" } },
      control: "text",
    },
    value: {
      description: "Native input value of this option.",
      table: { type: { summary: "string" }, defaultValue: { summary: "undefined" } },
      control: "text",
    },
    alignItems: {
      description: "Cross-axis alignment of the radio and its label.",
      table: { type: { summary: "string" }, defaultValue: { summary: "center" } },
      control: "text",
    },
    alignSelf: {
      description: "Align-self on the wrapper.",
      table: { type: { summary: "string" }, defaultValue: { summary: "undefined" } },
      control: "text",
    },
    margin: {
      description: "Margin on the wrapper.",
      table: { type: { summary: "number | number[]" }, defaultValue: { summary: "undefined" } },
      control: false,
    },
    iconProps: {
      description: "Props passed to the dot icon.",
      table: { type: { summary: "object" }, defaultValue: { summary: "undefined" } },
      control: "object",
    },
    onChange: {
      description: "Change handler of the native radio input.",
      table: { type: { summary: "(e: ChangeEvent<HTMLInputElement>) => void" } },
      action: "onChange",
    },
  },
}
