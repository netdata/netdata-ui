import Flex from "@/components/templates/flex"
import { H5, Text } from "@/components/typography"
import { Button } from "@/components/button"
import Tooltip from "."
import TooltipInk from "./tooltipInk"

export const Simple = () => (
  <Flex gap={4} flexWrap>
    <Tooltip align="top" content="Refresh every 1s">
      <Flex padding={[1, 2]} background="elementBackground" border>
        Top
      </Flex>
    </Tooltip>
    <Tooltip align="right" content="Refresh every 1s">
      <Flex padding={[1, 2]} background="elementBackground" border>
        Right
      </Flex>
    </Tooltip>
    <Tooltip content="Refresh every 1s">
      <Flex padding={[1, 2]} background="elementBackground" border>
        Bottom
      </Flex>
    </Tooltip>
    <Tooltip align="left" content="Refresh every 1s">
      <Flex padding={[1, 2]} background="elementBackground" border>
        Left
      </Flex>
    </Tooltip>
  </Flex>
)

const CustomContent = () => (
  <Flex gap={1} column>
    <H5 color="tooltipText" margin={[0]}>
      Title
    </H5>
    <Text color="tooltipText">This is the details</Text>
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

const RichContent = () => (
  <Flex gap={0.5} column>
    <H5 color="tooltipText" margin={[0]}>
      system.cpu
    </H5>
    {[
      ["user", "12.4%"],
      ["system", "3.1%"],
      ["iowait", "0.2%"],
    ].map(([dimension, value]) => (
      <Flex key={dimension} gap={4} justifyContent="between">
        <Text color="tooltipText">{dimension}</Text>
        <Text color="tooltipText" strong>
          {value}
        </Text>
      </Flex>
    ))}
  </Flex>
)

// Always-open tooltips so radius and shadow can be reviewed in both themes without hovering.
// One row per placement, each with room on every side, so no open tooltip covers another trigger.
const OpenRow = ({ children, padding = [12, 0] }) => (
  <Flex width="480px" padding={padding} justifyContent="center">
    {children}
  </Flex>
)

export const OpenStates = () => (
  <Flex column>
    {["top", "right", "bottom", "left"].map(align => (
      <OpenRow key={align}>
        <Tooltip open align={align} content={`Refresh every 1s (${align})`}>
          <Flex padding={[1, 2]} background="elementBackground" border>
            {align}
          </Flex>
        </Tooltip>
      </OpenRow>
    ))}
    <OpenRow padding={[24, 0, 4]}>
      <Tooltip open align="top" content={<RichContent />}>
        <Flex padding={[1, 2]} background="elementBackground" border>
          rich
        </Flex>
      </Tooltip>
    </OpenRow>
  </Flex>
)

// The standard card for named things: 13px title at 600 over a 13px description, wrapping at 300px.
export const TitleAndDescription = () => (
  <OpenRow padding={[4, 0, 24]}>
    <Tooltip
      open
      align="bottom"
      content={{ title: "Room: All nodes", description: "See all your rooms and switch room" }}
    >
      <Flex padding={[1, 2]} background="elementBackground" border>
        All nodes
      </Flex>
    </Tooltip>
  </OpenRow>
)

const MapReadout = () => (
  <Flex column gap={0.5}>
    <Text strong>Athens</Text>
    {[
      ["page views", "1,204"],
      ["LCP p75", "1.8 s"],
    ].map(([label, value]) => (
      <Flex key={label} gap={3} justifyContent="between">
        <Text color="textLite">{label}</Text>
        <Text>{value}</Text>
      </Flex>
    ))}
  </Flex>
)

export const OwnSurface = () => (
  <Flex gap={6} alignItems="start">
    {[
      ["Without TooltipInk", MapReadout],
      [
        "With TooltipInk",
        () => (
          <TooltipInk>
            <MapReadout />
          </TooltipInk>
        ),
      ],
    ].map(([label, Readout]) => (
      <Flex key={label} column gap={2}>
        <Text color="textLite">{label}</Text>
        <Flex background="tooltip" padding={[2, 3]} round={1.5} width={{ min: "180px" }}>
          <Readout />
        </Flex>
      </Flex>
    ))}
  </Flex>
)

export const Playground = {
  render: args => (
    <Flex padding={[12, 0]} justifyContent="center">
      <Tooltip {...args}>
        <Button label="Hover or focus me" />
      </Tooltip>
    </Flex>
  ),
  args: {
    content: "system.cpu is above 80% on node-eu-01",
    align: "top",
    plain: false,
    disabled: false,
    allowHoverOnTooltip: false,
    delay: 0,
    zIndex: 80,
  },
}

export const Disabled = {
  render: () => (
    <Flex gap={4}>
      <Tooltip disabled content="Not shown while disabled">
        <Button label="Tooltip disabled" />
      </Tooltip>
      <Tooltip content="Shown on hover and focus">
        <Button label="Tooltip enabled" />
      </Tooltip>
    </Flex>
  ),
}

export default {
  title: "Components/Drops/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A short hint that appears on hover or keyboard focus of its child. Use it to label icon-only controls or explain a value; do not put actions inside it.",
      },
    },
  },
  argTypes: {
    content: {
      description:
        "Tooltip body. A string, a node, or a function returning a node. Without content, only the child renders.",
      control: "text",
      table: { type: { summary: "ReactNode | () => ReactNode" } },
    },
    align: {
      description: "Side of the target the tooltip appears on.",
      control: "select",
      options: ["top", "right", "bottom", "left"],
      table: {
        type: { summary: '"top" | "right" | "bottom" | "left"' },
        defaultValue: { summary: '"top"' },
      },
    },
    plain: {
      description: "Render content as is, without the dark bubble.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "undefined" } },
    },
    open: {
      description: "Open the tooltip on mount.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    disabled: {
      description: "Never show the tooltip.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "undefined" } },
    },
    delay: {
      description: "Milliseconds to wait after hover before opening.",
      control: "number",
      table: { type: { summary: "number" }, defaultValue: { summary: "600" } },
    },
    allowHoverOnTooltip: {
      description:
        "Keep the tooltip open while the pointer is over it, so its content can be interacted with.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "undefined" } },
    },
    animation: {
      description: "Fade and lift the tooltip in over 120ms. Disabled under reduced motion.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "undefined" } },
    },
    zIndex: {
      description: "Stacking order of the tooltip.",
      control: "number",
      table: { type: { summary: "number" }, defaultValue: { summary: "80" } },
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
