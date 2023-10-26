import React from "react"
import useToggle from "@/hooks/useToggle"
import Flex from "@/components/templates/flex"
import { H5, Text } from "@/components/typography"
import { Button } from "@/components/button"
import Popover from "."

const PopoverContent = () => {
  const [clicked, toggle] = useToggle()
  return (
    <Flex padding={[2, 4]} gap={2} column>
      <Text color={["neutral", "white"]}>
        This is a popover that you can hover with you mouse and interact with the elements.
      </Text>
      <Button label={clicked ? "close" : "click me"} onClick={toggle} alignSelf="end" />
      {clicked && <Text color={["neutral", "white"]}>Hello</Text>}
    </Flex>
  )
}

const Content = ({ align }) => {
  return (
    <Popover align={align} content={() => <PopoverContent />}>
      <Flex padding={[2, 4]} background="elementBackground" border>
        <Text>{align}</Text>
      </Flex>
    </Popover>
  )
}

export const Simple = () => (
  <Flex gap={4} flexWrap>
    <Content align="top" />
    <Content align="right" />
    <Content align="bottom" />
    <Content align="left" />
  </Flex>
)

const CustomContent = () => (
  <Flex width="200px" gap={1} column>
    <H5 color={["neutral", "white"]} margin={[0]}>
      Title
    </H5>
    <Text color={["neutral", "white"]}>
      This is the details, you can hover your mouse in the popover
    </Text>
  </Flex>
)

const PlainContent = () => (
  <Flex width="200px" gap={1} column border>
    <H5 margin={[0]}>Title</H5>
    <Text>This is the details, you can hover your mouse in the popover</Text>
  </Flex>
)

export const Custom = () => (
  <Flex gap={4}>
    <Popover align="top" content={<CustomContent />}>
      <Button label="hover me" />
    </Popover>
    <Popover align="top" content={<PlainContent />} plain>
      <Button label="hover me (plain)" />
    </Popover>
  </Flex>
)

export default {
  component: Popover,
}
