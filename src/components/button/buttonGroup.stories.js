import { useState } from "react"
import { Button, ButtonGroup } from "."
import Flex from "@/components/templates/flex"
import { TextSmall } from "@/components/typography"

const rangeItems = [
  { label: "1h", value: "1h" },
  { label: "6h", value: "6h" },
  { label: "24h", value: "24h" },
  { label: "7d", value: "7d" },
]

export const RadioButtonGroup = args => {
  const [value, setValue] = useState(args.value)

  return <ButtonGroup items={args.items} value={value} buttonProps={args} onChange={setValue} />
}

export const MultiButtonGroup = args => {
  const [value, setValue] = useState([args.value])

  return (
    <ButtonGroup items={args.items} value={value} isMulti buttonProps={args} onChange={setValue} />
  )
}

export const TimeRange = () => {
  const [value, setValue] = useState("6h")

  return (
    <Flex column gap={2}>
      <ButtonGroup items={rangeItems} value={value} onChange={setValue} />
      <TextSmall color="textLite">system.cpu over the last {value}</TextSmall>
    </Flex>
  )
}

export const SeverityFilter = () => {
  const [value, setValue] = useState(["critical"])

  return (
    <ButtonGroup
      isMulti
      items={[
        { label: "Critical", value: "critical", title: "Show critical alerts" },
        { label: "Warning", value: "warning", title: "Show warning alerts" },
        { label: "Clear", value: "clear", title: "Show cleared alerts" },
      ]}
      value={value}
      onChange={setValue}
    />
  )
}

export const WithChildren = () => (
  <Flex column gap={3}>
    <ButtonGroup>
      <Button flavour="hollow" neutral label="Edit" />
      <Button flavour="hollow" neutral label="Copy" />
      <Button flavour="hollow" neutral label="Delete" />
    </ButtonGroup>
    <ButtonGroup>
      <Button flavour="hollow" neutral label="Only" />
    </ButtonGroup>
  </Flex>
)

export const Sizes = () => (
  <Flex column gap={3}>
    <ButtonGroup items={rangeItems} value="24h" />
    <ButtonGroup items={rangeItems} value="24h" buttonProps={{ large: true }} />
  </Flex>
)

// The contained-tabs track, for switching a value in place (time range, chart type).
export const SegmentedVariant = () => {
  const [range, setRange] = useState("6h")
  const [severity, setSeverity] = useState(["critical"])

  return (
    <Flex column gap={3} alignItems="start">
      <ButtonGroup variant="segmented" items={rangeItems} value={range} onChange={setRange} />
      <ButtonGroup
        variant="segmented"
        isMulti
        items={[
          { label: "Critical", value: "critical" },
          { label: "Warning", value: "warning" },
          { label: "Clear", value: "clear", buttonProps: { disabled: true } },
        ]}
        value={severity}
        onChange={setSeverity}
      />
    </Flex>
  )
}

export default {
  title: "Components/Button/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A row of joined buttons. Pass `items` for a single or multi select segmented control, or pass `Button` children for a plain action group.",
      },
    },
  },
  args: {
    items: [
      { label: "One", value: "1" },
      { label: "Two", value: "2" },
      { label: "Three", value: "3" },
    ],
    value: "1",
    buttonProps: {},
  },
  argTypes: {
    items: {
      description: "Segments as { label, value, title?, buttonProps? }. When set, children are ignored.",
      table: { type: { summary: "Array<{ label, value, title?, buttonProps? }>" } },
      control: "object",
    },
    value: {
      description: "Selected value, or an array of values when isMulti.",
      table: { type: { summary: "string | number | Array" } },
      control: "text",
    },
    isMulti: {
      description: "Allow several selected segments; onChange receives an array.",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "undefined" } },
      control: "boolean",
    },
    onChange: {
      description: "Called with the new value (or array of values when isMulti).",
      table: { type: { summary: "(value) => void" }, defaultValue: { summary: "noop" } },
      action: "onChange",
    },
    ButtonComponent: {
      description: "Component rendered for each segment.",
      table: { type: { summary: "ComponentType" }, defaultValue: { summary: "Button" } },
      control: false,
    },
    buttonProps: {
      description: "Props passed to every segment, e.g. { large: true }.",
      table: { type: { summary: "object" }, defaultValue: { summary: "{}" } },
      control: "object",
    },
    variant: {
      description:
        "`segmented` renders items on the shared tinted track (22px items, 13px text) with aria-pressed. ButtonComponent is not used, and buttonProps go to each native item button.",
      options: ["default", "segmented"],
      table: { type: { summary: '"default" | "segmented"' }, defaultValue: { summary: "default" } },
      control: { type: "radio" },
    },
    children: {
      description: "Buttons to join when items is not set.",
      table: { type: { summary: "ReactNode" } },
      control: false,
    },
  },
}
