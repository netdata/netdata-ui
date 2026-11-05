import React from "react"
import useToggle from "@/hooks/useToggle"
import Flex from "@/components/templates/flex"
import { H5, Text } from "@/components/typography"
import { Button } from "@/components/button"
import Popover from "."

const PopoverContent = () => {
  const [clicked, toggle] = useToggle()
  return (
    <Flex gap={2} column>
      <Text>
        Node-eu-01 raised 3 alerts in the last hour. Move the pointer into this popover to act on
        them.
      </Text>
      <Button label={clicked ? "close" : "click me"} onClick={toggle} alignSelf="end" />
      {clicked && <Text>Hello</Text>}
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
    <H5 margin={[0]}>node-eu-01</H5>
    <Text>system.cpu is at 86% for the last 5 minutes. You can hover this popover.</Text>
  </Flex>
)

const PlainContent = () => (
  <Flex width="200px" gap={1} column border>
    <H5 margin={[0]}>node-eu-01</H5>
    <Text>system.cpu is at 86% for the last 5 minutes. You can hover this popover.</Text>
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

// Always open so the menu-layer surface, border and arrow can be reviewed in both themes.
export const OpenStates = () => (
  <Flex gap={16} padding={[16, 8]} flexWrap>
    {["top", "bottom"].map(align => (
      <Popover key={align} open align={align} content={<CustomContent />}>
        <Flex padding={[2, 4]} background="elementBackground" border>
          <Text>{align}</Text>
        </Flex>
      </Popover>
    ))}
  </Flex>
)

export const Playground = {
  render: args => (
    <Flex padding={[12, 8]} justifyContent="center">
      <Popover {...args}>
        <Button label="Hover or focus me" />
      </Popover>
    </Flex>
  ),
  args: {
    content: <CustomContent />,
    align: "top",
    plain: false,
    animation: false,
    zIndex: 70,
  },
}

export default {
  title: "Components/Drops/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A floating panel that opens on hover or focus of its child and stays open while the pointer is over the target or the panel. Use it for read-only detail or small interactions that do not need a dialog.",
      },
    },
  },
  argTypes: {
    content: {
      description: "Popover body: a node or a function returning a node.",
      control: false,
      table: { type: { summary: "ReactNode | () => ReactNode" } },
    },
    align: {
      description: "Side of the target the popover appears on.",
      control: "select",
      options: ["top", "right", "bottom", "left"],
      table: {
        type: { summary: '"top" | "right" | "bottom" | "left"' },
        defaultValue: { summary: '"top"' },
      },
    },
    plain: {
      description: "Render content as is, without the bordered dropdown surface and arrow.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "undefined" } },
    },
    open: {
      description:
        "Keep the popover open (true) or closed (false). Changing it re-syncs the state.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    animation: {
      description: "Fade and lift the popover in over 120ms. Disabled under reduced motion.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "undefined" } },
    },
    zIndex: {
      description: "Stacking order of the popover.",
      control: "number",
      table: { type: { summary: "number" }, defaultValue: { summary: "70" } },
    },
    onHoverChange: {
      description: "Called with true when the pointer enters the target and false when it leaves.",
      action: "onHoverChange",
      table: { type: { summary: "(hovered: boolean) => void" }, defaultValue: { summary: "noop" } },
    },
    dropProps: {
      description: "Props forwarded to the underlying Drop, such as a custom align.",
      control: "object",
      table: { type: { summary: "DropProps" } },
    },
    children: {
      description: "The target element. It receives hover, focus and aria-describedby handlers.",
      control: false,
      table: { type: { summary: "ReactNode" } },
    },
  },
}
