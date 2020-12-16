import React from "react"
import { storiesOf } from "@storybook/react"
import { boolean, number } from "@storybook/addon-knobs"
import { useToggle } from "react-use"
import { readmeCleanup } from "utils/readme"
import Flex from "src/components/templates/flex"
import { H2, Text } from "src/components/typography"
import { Button } from "src/components/button"
import readme from "./README.md"
import Collapsible from "./index"

const story = storiesOf("COMPONENTS|Collapsible", module)

const subData = {
  readme: {
    sidebar: readmeCleanup(readme),
  },
  jest: ["index.test.js"],
}

const Content = () => (
  <Flex gap={2} background="disabled" padding={[4]} column>
    <H2 margin={[0]}>This is a collapsible view</H2>
    <Text>You can expand and collapse it.</Text>
  </Flex>
)

story.add("Simple", () => {
  return (
    <Collapsible open={boolean("open", true)} duration={number("duration", 150)}>
      <Content />
    </Collapsible>
  )
})

story.add(
  "Controlled",
  () => {
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
  subData
)
