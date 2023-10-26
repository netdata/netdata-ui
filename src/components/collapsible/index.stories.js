import React, { useEffect } from "react"
import useToggle from "@/hooks/useToggle"
import Flex from "@/components/templates/flex"
import { H2, Text } from "@/components/typography"
import { Button } from "@/components/button"
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

export default {
  component: Collapsible,
  args: {
    open: false,
    persist: false,
    duration: 150,
    closedValue: 0,
    direction: "vertical",
  },
  argTypes: {
    open: { control: "boolean" },
    persist: { control: "boolean" },
    duration: { control: "number" },
    closedValue: { control: "number" },
    direction: {
      options: ["vertical", "horizontal"],
      control: { type: "radio" },
    },
  },
}
