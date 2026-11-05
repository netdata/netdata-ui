import React, { useEffect, useState } from "react"
import Flex from "@/components/templates/flex"
import { TextSmall } from "@/components/typography"
import RangeInput from "."

export const InputRange = args => {
  const [value, setValue] = useState(args.value)

  useEffect(() => {
    setValue(args.value)
  }, [args.value])

  return (
    <RangeInput
      {...args}
      value={value}
      onChange={e => {
        setValue(e.target.value)
      }}
    />
  )
}

const Controlled = ({ label, ...props }) => {
  const [value, setValue] = useState(props.value)
  return (
    <Flex column gap={2} width="240px">
      <TextSmall>{label}</TextSmall>
      <RangeInput {...props} value={value} onChange={e => setValue(e.target.value)} />
    </Flex>
  )
}

export const States = () => (
  <Flex column gap={6}>
    <Controlled label="Value 40" value={40} />
    <Controlled label="Min 50, max 100, value 75 (fill 50%)" min={50} max={100} value={75} />
    <Controlled label="At min (empty fill)" min={50} max={100} value={50} />
    <Controlled label="Disabled" value={40} disabled />
  </Flex>
)

const t = (summary, def) => ({ type: { summary }, defaultValue: { summary: def } })

export default {
  title: "Components/Input/Range",
  component: RangeInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A single-thumb slider for picking a number in a range. Use it for quick, approximate numeric settings such as a refresh interval or a threshold.",
      },
    },
  },
  args: {
    value: 0,
    max: 100,
    min: 0,
    step: 1,
  },
  argTypes: {
    value: { description: "Current value.", table: t("number", "0"), control: "number" },
    min: { description: "Lowest value.", table: t("number", "0"), control: "number" },
    max: { description: "Highest value.", table: t("number", "100"), control: "number" },
    step: { description: "Increment between values.", table: t("number", "1"), control: "number" },
    disabled: { description: "Fades the slider to 40% and blocks input.", table: t("boolean", "undefined"), control: "boolean" },
    onChange: { description: "Called with the change event; read e.target.value.", table: t("(e: ChangeEvent) => void", "undefined"), action: "onChange" },
    onInput: { description: "Called on every drag movement.", table: t("(e: SyntheticEvent) => void", "undefined"), action: "onInput" },
  },
}
