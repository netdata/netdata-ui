import React from "react"
import { boolean, number } from "@storybook/addon-knobs"
import useToggle from "react-use/lib/useToggle"
import Flex from "src/components/templates/flex"
import { H2, Text } from "src/components/typography"
import { Button } from "src/components/button"
import Collapsible from "."

const Content = () => (
  <Flex gap={2} background="disabled" padding={[4]} column>
    <H2 margin={[0]}>This is a collapsible view</H2>
    <Text>You can expand and collapse it.</Text>
  </Flex>
)

export const Simple = {
  component: () => {
    return (
      <Collapsible open={boolean("open", true)} duration={number("duration", 150)}>
        <Content />
      </Collapsible>
    )
  },
}

export const Controlled = {
  component: () => {
    const [open, toggle] = useToggle(false)
    return (
      <Flex gap={2} column>
        <Flex gap={2} justifyContent="between" alignItems="center">
          <Text>The following is a collapsible view</Text>
          <Button onClick={toggle} label={open ? "collapse" : "expand"} />
        </Flex>
        <Collapsible open={open}>{() => <Content />}</Collapsible>
      </Flex>
    )
  },
}

export default {
  component: Collapsible,
}
