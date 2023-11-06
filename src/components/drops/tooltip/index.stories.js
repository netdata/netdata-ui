import React from "react"
import Flex from "@/components/templates/flex"
import { H5, Text } from "@/components/typography"
import { Button } from "@/components/button"
import Tooltip from "."

export const Simple = () => (
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

export const Custom = () => (
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
)

export default {
  component: Tooltip,
}
