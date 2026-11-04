import React, { useEffect } from "react"
import useToggle from "@/hooks/useToggle"
import Flex from "@/components/templates/flex"
import { H2, Text } from "@/components/typography"
import { Button } from "@/components/button"
import { Icon } from "@/components/icon"
import Collapsible from "."

const Content = () => (
  <Flex gap={2} background="disabled" padding={[4]} column>
    <H2 margin={[0]}>This is a collapsible view</H2>
    <Text>You can expand and collapse it.</Text>
  </Flex>
)

export const Basic = args => {
  const [open, toggle] = useToggle(args.open)

  useEffect(() => {
    toggle(args.open)
  }, [args.open])

  return (
    <Flex gap={2} column>
      <Flex gap={2} justifyContent="between" alignItems="center">
        <Text>The following is a collapsible view</Text>
        <Button onClick={toggle} label={open ? "collapse" : "expand"} />
      </Flex>
      <Collapsible {...args} open={open}>
        {() => <Content />}
      </Collapsible>
    </Flex>
  )
}

export const Disclosure = () => {
  const [open, toggle] = useToggle(false)

  return (
    <Flex column border round padding={[1]} width={100}>
      <Flex
        as="button"
        alignItems="center"
        gap={2}
        padding={[2]}
        onClick={toggle}
        aria-expanded={open}
        cursor="pointer"
        background="transparent"
        border={false}
      >
        <Icon name="chevron_right_s" size="small" rotate={open ? 1 : 0} color="textLite" />
        <Text strong>Collection settings</Text>
      </Flex>
      <Collapsible open={open}>
        <Flex column gap={1} padding={[1, 3, 3, 8]}>
          <Text>Update every 1s</Text>
          <Text>Retention 14 days in tier 0</Text>
        </Flex>
      </Collapsible>
    </Flex>
  )
}

export const Horizontal = () => {
  const [open, toggle] = useToggle(true)

  return (
    <Flex gap={2} alignItems="center">
      <Button onClick={toggle} label={open ? "collapse" : "expand"} />
      <Collapsible open={open} direction="horizontal">
        <Flex background="elementBackground" round padding={[2, 4]} width={60}>
          <Text whiteSpace="nowrap">Horizontal panel</Text>
        </Flex>
      </Collapsible>
    </Flex>
  )
}

const prop = (description, type, defaultValue, control) => ({
  description,
  control,
  table: { type: { summary: type }, defaultValue: { summary: defaultValue } },
})

export default {
  title: "Components/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A container that animates open and closed. Use it to reveal secondary content, such as the settings of a collection job, without a page change.",
      },
    },
  },
  args: {
    open: false,
    persist: false,
    duration: 150,
    closedValue: 0,
    direction: "vertical",
  },
  argTypes: {
    open: prop("Whether the content is expanded.", "boolean", "false", "boolean"),
    persist: prop("Keep children mounted while closed.", "boolean", "false", "boolean"),
    duration: prop(
      "Animation time in ms. Skipped under prefers-reduced-motion.",
      "number",
      "150",
      "number"
    ),
    closedValue: prop("Size in px kept visible when closed.", "number", "0", "number"),
    direction: prop("Axis that collapses.", "'vertical' | 'horizontal'", '"vertical"', {
      type: "radio",
      options: ["vertical", "horizontal"],
    }),
    overflow: prop(
      "Overflow applied once fully open. Content is clipped while animating.",
      "string",
      '"visible"',
      "text"
    ),
    initial: prop(
      "Initial max size when first rendered open, before the measured size applies.",
      "string",
      "undefined",
      "text"
    ),
    children: {
      description: "Content, or a function receiving whether the panel is mounted open.",
      control: false,
      table: { type: { summary: "ReactNode | (open: boolean) => ReactNode" } },
    },
  },
}
