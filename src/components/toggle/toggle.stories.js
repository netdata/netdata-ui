import { useState, useEffect } from "react"
import { Toggle } from "./toggle"
import { useCallback } from "react"
import Flex from "@/components/templates/flex"

export const Basic = args => {
  const [checked, setChecked] = useState(false)

  const onChange = useCallback(() => setChecked(prev => !prev), [setChecked])

  useEffect(() => {
    setChecked(args.checked)
  }, [args.checked])

  return <Toggle {...args} checked={checked} onChange={onChange} />
}

const noop = () => {}

export const States = () => (
  <Flex column gap={3}>
    <Flex gap={6}>
      <Toggle checked={false} onChange={noop} labelRight="Off" />
      <Toggle checked onChange={noop} labelRight="On" />
      <Toggle checked={false} disabled onChange={noop} labelRight="Disabled" />
      <Toggle checked disabled onChange={noop} labelRight="Disabled on" />
      <Toggle
        checked={false}
        onChange={noop}
        labelRight="No transition"
        toggleProps={{ withTransition: false }}
      />
    </Flex>
    <Flex gap={6}>
      <Toggle colored checked={false} onChange={noop} labelRight="Colored off" />
      <Toggle colored checked onChange={noop} labelRight="Colored on" />
      <Toggle
        colored
        checked={false}
        onChange={noop}
        labelRight="Neutral off (toggleProps)"
        toggleProps={{ uncheckedColor: ["neutral", "grey130"], checkedColor: "primary" }}
      />
    </Flex>
  </Flex>
)

export const Outline = () => (
  <Flex column gap={3}>
    {["small", "compact"].map(size => (
      <Flex key={size} gap={6}>
        <Toggle size={size} variant="outline" checked={false} onChange={noop} labelRight="Off" />
        <Toggle size={size} variant="outline" checked onChange={noop} labelRight="On" />
        <Toggle
          size={size}
          variant="outline"
          checked
          disabled
          onChange={noop}
          labelRight="Disabled"
        />
      </Flex>
    ))}
  </Flex>
)

export const TwoOptions = () => {
  const [checked, setChecked] = useState(false)

  return (
    <Toggle
      labelLeft="Dark theme"
      labelRight="Light theme"
      checked={checked}
      onChange={e => setChecked(e.currentTarget.checked)}
    />
  )
}

export const Settings = () => {
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [anomalies, setAnomalies] = useState(false)

  return (
    <Flex column gap={3}>
      <Toggle
        checked={autoRefresh}
        onChange={e => setAutoRefresh(e.currentTarget.checked)}
        labelRight="Auto refresh system.cpu"
      />
      <Toggle
        checked={anomalies}
        onChange={e => setAnomalies(e.currentTarget.checked)}
        labelRight="Show anomaly ribbon"
      />
    </Flex>
  )
}

export default {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A switch for settings that apply immediately. Use it for on/off options such as auto refresh; use a Checkbox when the choice is submitted with a form.",
      },
    },
  },
  args: {
    checked: false,
    disabled: false,
    colored: true,
    labelLeft: "Left",
    labelRight: "Right",
  },
  argTypes: {
    checked: {
      description: "Whether the switch is on. The component is controlled.",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "undefined" } },
      control: "boolean",
    },
    disabled: {
      description: "Dims the switch to 40% and blocks interaction.",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "undefined" } },
      control: "boolean",
    },
    colored: {
      description: "Uses status colours: primary track when on, error knob when off.",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
      control: "boolean",
    },
    labelLeft: {
      description: "Label before the switch. Falls back to children.",
      table: { type: { summary: "ReactNode" }, defaultValue: { summary: "children" } },
      control: "text",
    },
    labelRight: {
      description: "Label after the switch.",
      table: { type: { summary: "ReactNode" }, defaultValue: { summary: "undefined" } },
      control: "text",
    },
    Label: {
      description: "Component used to render the labels.",
      table: { type: { summary: "ComponentType" }, defaultValue: { summary: "Text" } },
      control: false,
    },
    toggleProps: {
      description:
        "Props for the switch element: withTransition, checkedColor, uncheckedColor, defaultColor.",
      table: { type: { summary: "object" }, defaultValue: { summary: "{}" } },
      control: "object",
    },
    onChange: {
      description:
        "Change handler of the underlying checkbox input; read event.currentTarget.checked.",
      table: { type: { summary: "(e: ChangeEvent<HTMLInputElement>) => void" } },
      action: "onChange",
    },
    className: {
      description: "Class name on the label wrapper.",
      table: { type: { summary: "string" } },
      control: "text",
    },
    margin: {
      description: "Margin on the label wrapper.",
      table: { type: { summary: "number | number[]" } },
      control: false,
    },
    alignSelf: {
      description: "Align-self on the label wrapper.",
      table: { type: { summary: "string" } },
      control: "text",
    },
  },
}
