import React from "react"
import { storiesOf } from "@storybook/react"
import { readmeCleanup } from "utils/readme"
import Flex from "src/components/templates/flex"
import { H5, Text } from "src/components/typography"
import { Button } from "src/components/button"
import readme from "./README.md"
import Tooltip from "./index"

const story = storiesOf("Drops/Tooltip", module)

const subData = {
  readme: {
    sidebar: readmeCleanup(readme),
  },
  jest: ["index.test.js"],
}

story.add(
  "Simple",
  () => (
    <Flex gap={4} flexWrap>
      <Tooltip align="top" content="Tooltip content">
        <Flex padding={[1, 2]} background="elementBackground" border>
          Top
        </Flex>
      </Tooltip>
      <Tooltip align="right" content="Tooltip content">
        <Flex padding={[1, 2]} background="elementBackground" border>
          Right
        </Flex>
      </Tooltip>
      <Tooltip content="Tooltip content">
        <Flex padding={[1, 2]} background="elementBackground" border>
          Bottom
        </Flex>
      </Tooltip>
      <Tooltip align="left" content="Tooltip content">
        <Flex padding={[1, 2]} background="elementBackground" border>
          Left
        </Flex>
      </Tooltip>
    </Flex>
  ),
  subData
)

story.add(
  "Default Variations",
  () => (
    <Flex gap={4} flexWrap>
      <Tooltip align="top" content="Plain tooltip content" plain>
        <Flex padding={[1, 2]} background="elementBackground" border>
          Plain
        </Flex>
      </Tooltip>
      <Tooltip
        align="top"
        icon="integrationSlackColored"
        iconColor="default"
        content="Choose how to aggregate metrics,
over a specific timeframe, from your
clusters pods or containers."
        title="This is a scalable tooltip"
      >
        <Flex padding={[1, 2]} background="elementBackground" border>
          With title and icon
        </Flex>
      </Tooltip>
      <Tooltip
        align="top"
        content="Choose how to aggregate metrics,
over a specific timeframe, from your
clusters pods or containers."
        title="This is a scalable tooltip"
      >
        <Flex padding={[1, 2]} background="elementBackground" border>
          With title
        </Flex>
      </Tooltip>
      <Tooltip align="top" icon="integrationSlack" title="This is a scalable tooltip">
        <Flex padding={[1, 2]} background="elementBackground" border>
          Only title and icon
        </Flex>
      </Tooltip>
      <Tooltip align="top" title="This is a scalable tooltip">
        <Flex padding={[1, 2]} background="elementBackground" border>
          Only title
        </Flex>
      </Tooltip>
    </Flex>
  ),
  subData
)

const CustomContent = () => (
  <Flex gap={1} column>
    <H5 color={["neutral", "white"]} margin={[0]}>
      Title
    </H5>
    <Text color={["neutral", "white"]}>This is the details</Text>
  </Flex>
)

const PlainContent = () => (
  <Flex gap={1} column border>
    <H5 margin={[0]}>Title</H5>
    <Text>This is the details</Text>
  </Flex>
)

story.add(
  "Custom",
  () => (
    <Flex gap={4}>
      <Tooltip allowHoverOnTooltip align="top" content={<CustomContent />}>
        <Button label="allow hover tooltip" />
      </Tooltip>
      <Tooltip align="top" content={<CustomContent />}>
        <Button label="hover me" />
      </Tooltip>
      <Tooltip align="top" content={<PlainContent />} plain>
        <Button label="hover me (plain)" />
      </Tooltip>
    </Flex>
  ),
  subData
)
