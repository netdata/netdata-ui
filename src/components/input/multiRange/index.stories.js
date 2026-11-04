import React, { useEffect, useState } from "react"
import Flex from "@/components/templates/flex"
import MultiRangeInput from "."

export const InputMultiRange = args => {
  const [maxValue, setMaxValue] = useState(args.initMax)
  const [minValue, setMinValue] = useState(args.initMin)

  useEffect(() => {
    setMaxValue(args.initMax)
    setMinValue(args.initMin)
  }, [args.initMax, args.initMin])

  return (
    <Flex width="400px">
      <MultiRangeInput
        {...args}
        initMax={maxValue}
        initMin={minValue}
        onChange={({ max, min }) => {
          setMaxValue(max)
          setMinValue(min)
        }}
      />
    </Flex>
  )
}

const t = (summary, def) => ({ type: { summary }, defaultValue: { summary: def } })

export default {
  title: "Components/Input/MultiRange",
  component: MultiRangeInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A two-thumb slider for picking a lower and an upper bound. Use it to filter by a numeric span, such as a value range for a chart.",
      },
    },
  },
  args: {
    initMax: 100,
    initMin: 0,
    max: 100,
    min: 0,
    step: 1,
  },
  argTypes: {
    initMin: { description: "Initial lower value. Falls back to min.", table: t("number", "undefined"), control: "number" },
    initMax: { description: "Initial upper value. Falls back to max.", table: t("number", "undefined"), control: "number" },
    min: { description: "Lowest selectable value.", table: t("number", "0"), control: "number" },
    max: { description: "Highest selectable value.", table: t("number", "100"), control: "number" },
    step: { description: "Increment between values; also the minimum gap between thumbs.", table: t("number", "1"), control: "number" },
    TextComponent: { description: "Component used to render the min and max labels.", table: t("ComponentType", "TextSmall"), control: false },
    onChange: { description: "Called with { max, min } when a drag ends.", table: t("({ max, min }) => void", "undefined"), action: "onChange" },
    onInput: { description: "Called with { max, min } while dragging.", table: t("({ max, min }) => void", "undefined"), action: "onInput" },
  },
}
