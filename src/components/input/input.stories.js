import { Icon } from "@/components/icon"
import Flex from "@/components/templates/flex"
import { Button } from "@/components/button"
import Select from "@/components/select"
import { TextInput } from "."

const noop = () => {}

export const WithIcons = args => (
  <TextInput
    {...args}
    iconLeft={<Icon key="nodes" name="nodes" color="textLite" size="small" />}
    iconRight={<Icon key="nodes" name="nodes" color="textLite" size="small" />}
  />
)

export const Basic = args => <TextInput {...args} />

const Sample = props => (
  <Flex width="220px">
    <TextInput onChange={noop} containerStyles={{ width: "100%" }} {...props} />
  </Flex>
)

export const States = () => (
  <Flex column gap={4}>
    <Flex gap={4} alignItems="start" flexWrap>
      <Sample label="Empty" placeholder="Placeholder text" hint="Hint text" value="" />
      <Sample label="Filled" value="cpu.usage" />
      <Sample label="Error" value="abc" error="Must be a number" />
      <Sample label="Error (true)" value="abc" error />
      <Sample label="Disabled" value="cpu.usage" disabled />
      <Sample label="Disabled empty" placeholder="Placeholder text" value="" disabled />
    </Flex>
    <Flex gap={4} alignItems="start" flexWrap>
      <Sample
        label="Icons + indicator"
        placeholder="Nodes"
        value=""
        fieldIndicator="12/20"
        iconLeft={<Icon name="nodes" color="textLite" size="small" />}
        iconRight={<Icon name="search" color="textLite" size="small" />}
      />
      <Sample label="Indicator only" value="hello" fieldIndicator="5/20" />
      <Sample label="Autofocus (focus ring)" value="focused" autoFocus />
      <Sample label="Own background keeps its fill on focus" value="clause" background="clauseBg" />
    </Flex>
  </Flex>
)

export const Sizes = () => (
  <Flex column gap={3}>
    <Sample label="compact (24px)" size="compact" placeholder="compact" value="" />
    <Sample label="tiny (24px, same as compact)" size="tiny" placeholder="tiny" value="" />
    <Sample label="small (30px)" size="small" placeholder="small" value="" />
    <Sample label="large / default (30px)" placeholder="large" value="" />
    <Sample label="height={8} override (32px)" height={8} placeholder="32px" value="" />
  </Flex>
)

export const AlignedWithControls = () => (
  <Flex gap={2} alignItems="center">
    <TextInput onChange={noop} placeholder="Filter" value="" containerStyles={{ width: "180px" }} />
    <Select options={[{ label: "Last 15 minutes", value: "15m" }]} placeholder="Range" />
    <Button label="Apply" />
  </Flex>
)

const t = (summary, def) => ({ type: { summary }, defaultValue: { summary: def } })

export default {
  title: "Components/Input",
  component: TextInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A single-line text field with a label, hint, error message, icons and a field indicator. Use it for free-text entry such as filters, names and metric contexts.",
      },
    },
  },
  args: {
    error: "",
    disabled: false,
    name: "context",
    hint: "Use a metric context, e.g. system.cpu",
    fieldIndicator: "",
    placeholder: "Metric context",
    label: "Context",
    value: "",
    size: "small",
  },
  argTypes: {
    label: { description: "Label above the field. A string renders as label text; a node renders as is.", table: t("string | ReactNode", "undefined"), control: "text" },
    value: { description: "Current value. The input is controlled: pair it with onChange.", table: t("string", "undefined"), control: "text" },
    placeholder: { description: "Text shown while the field is empty.", table: t("string", '""'), control: "text" },
    hint: { description: "Helper text under the field.", table: t("string | ReactNode", "undefined"), control: "text" },
    error: { description: "A string shows as the error message; true shows 'invalid'. Also colours the border.", table: t("boolean | string | ReactNode", "undefined"), control: "text" },
    disabled: { description: "Fades the field to 40% and blocks input.", table: t("boolean", "undefined"), control: "boolean" },
    size: { description: "Field height: tiny and compact are 24px (12px text), small and large are 30px (13px text). `height` overrides it.", table: t('"tiny" | "compact" | "small" | "large"', '"large"'), control: { type: "radio" }, options: ["tiny", "compact", "small", "large"] },
    name: { description: "Input name; also used as its aria-label.", table: t("string", "undefined"), control: "text" },
    iconLeft: { description: "Element shown inside the field, left side.", table: t("ReactNode", "undefined"), control: false },
    iconRight: { description: "Element shown inside the field, right side.", table: t("ReactNode", "undefined"), control: false },
    fieldIndicator: { description: "Small meta text inside the field, right side, e.g. a character count.", table: t("string | ReactNode", "undefined"), control: "text" },
    hideErrorMessage: { description: "Hides the error message but keeps the error border.", table: t("boolean", "undefined"), control: "boolean" },
    errorMessageProps: { description: "Props passed to the error message text.", table: t("object", "{}"), control: false },
    containerStyles: { description: "Props applied to the outer label container (Flex props).", table: t("object", "undefined"), control: false },
    inputContainerStyles: { description: "Props applied to the wrapper around the input (Flex props).", table: t("object", "undefined"), control: false },
    className: { description: "Class name for the outer container.", table: t("string", "undefined"), control: "text" },
    inputRef: { description: "Ref or callback ref for the underlying input element.", table: t("Ref | (input) => void", "undefined"), control: false },
    onChange: { description: "Called with the change event.", table: t("(e: ChangeEvent) => void", "undefined"), action: "onChange" },
    onFocus: { description: "Called when the input gains focus.", table: t("(e: FocusEvent) => void", "undefined"), action: "onFocus" },
    onBlur: { description: "Called when the input loses focus.", table: t("(e: FocusEvent) => void", "undefined"), action: "onBlur" },
  },
}
