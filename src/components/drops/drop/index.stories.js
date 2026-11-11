import { useState, useEffect, useRef } from "react"
import { action } from "storybook/actions"
import Flex from "@/components/templates/flex"
import { Text, TextSmall } from "@/components/typography"
import Drop from "."

const DropDemo = ({ label = "system.cpu", children, ...dropProps }) => {
  const ref = useRef()

  const [, setShowDrop] = useState(false)
  useEffect(() => {
    // The target ref only exists after mount, so show the drop on the next tick.
    setTimeout(() => setShowDrop(true), 200)
  }, [])

  return (
    <Flex>
      <Flex ref={ref} background="elementBackground" border padding={[2, 4]}>
        <Text>{label}</Text>
      </Flex>
      {ref.current && (
        <Drop target={ref.current} {...dropProps}>
          {children}
        </Drop>
      )}
    </Flex>
  )
}

const CpuDetails = () => (
  <Flex background="dropdown" padding={[3]} column gap={1}>
    <Text strong>system.cpu</Text>
    <TextSmall color="textLite">user 12.4%, system 3.1%, iowait 0.2%</TextSmall>
  </Flex>
)

export const Basic = {
  render: args => (
    <Flex height="160px">
      <DropDemo {...args}>
        <CpuDetails />
      </DropDemo>
    </Flex>
  ),
  args: {
    align: { top: "bottom", left: "left" },
    stretch: "width",
    backdrop: false,
    canHideTarget: false,
    dataDrop: "drop-content",
    onEsc: action("onEsc"),
    onClickOutside: action("onClickOutside"),
  },
}

const positions = [
  { top: "top" },
  { top: "top", right: "left" },
  { top: "top", right: "right" },
  { top: "top", left: "left" },
  { top: "top", left: "right" },
  { top: "bottom" },
  { top: "bottom", right: "left" },
  { top: "bottom", right: "right" },
  { top: "bottom", left: "left" },
  { top: "bottom", left: "right" },
  { bottom: "bottom" },
  { bottom: "bottom", right: "left" },
  { bottom: "bottom", right: "right" },
  { bottom: "bottom", left: "left" },
  { bottom: "bottom", left: "right" },
  { bottom: "top" },
  { bottom: "top", right: "left" },
  { bottom: "top", right: "right" },
  { bottom: "top", left: "left" },
  { bottom: "top", left: "right" },
  { right: "right" },
  { left: "left" },
  {},
]

const DropBox = ({ position }) => {
  const ref = useRef()

  const [, setShowDrop] = useState(false)
  useEffect(() => {
    setShowDrop(true)
  }, [])

  return (
    <Flex margin={[4]} relative>
      <Flex ref={ref} background="elementBackground" border padding={[1]} width={10} height={10}>
        {Object.keys(position)
          .map(d => `${d[0]}-${position[d][0]}`)
          .join(", ")}
      </Flex>
      {ref.current && (
        <Drop target={ref.current} align={position} stretch={false}>
          <Flex background="dropdown" padding={[1]}>
            hello
          </Flex>
        </Drop>
      )}
    </Flex>
  )
}

export const Positions = () => {
  return (
    <Flex flexWrap>
      {positions.map((position, index) => (
        <DropBox key={index} position={position} />
      ))}
    </Flex>
  )
}

export const ScrollContainer = {
  render: () => (
    <Flex height="400px" border overflow="auto">
      <Flex height="1000px" width="400px">
        <DropDemo align={{ top: "bottom", left: "left" }}>
          <CpuDetails />
        </DropDemo>
      </Flex>
    </Flex>
  ),
}

export const Stretch = () => {
  const Component = ({ label, stretch }) => {
    const ref = useRef()

    const [, setShowDrop] = useState(false)
    useEffect(() => {
      setTimeout(() => setShowDrop(true), 100)
    }, [])

    return (
      <Flex margin={[10]}>
        <Flex ref={ref} background="elementBackground" border padding={[2, 8]}>
          {stretch === false && "No stretch"}
          {stretch === "align" && "align stretch"}
          {stretch === undefined && "width stretch"}
        </Flex>
        {ref.current && (
          <Drop target={ref.current} align={{ top: "bottom", left: "left" }} stretch={stretch}>
            <Flex background="dropdown" padding={[2]}>
              {label}
            </Flex>
          </Drop>
        )}
      </Flex>
    )
  }

  return (
    <Flex flexWrap>
      <Component label="system.cpu" />
      <Component label="system.cpu, system.load, system.ram, system.io" />
      <Component stretch="align" label="system.cpu" />
      <Component stretch="align" label="system.cpu, system.load, system.ram, system.io" />
      <Component stretch={false} label="system.cpu" />
      <Component stretch={false} label="system.cpu, system.load, system.ram, system.io" />
    </Flex>
  )
}

const longText =
  "The disk space alert on node-eu-01 has been critical for 12 minutes. The drop is moved when it would overflow the viewport, so it stays readable near the edges."

export const Boundaries = () => {
  const ref = useRef()

  const [, setShowDrop] = useState(false)
  useEffect(() => {
    setTimeout(() => setShowDrop(true), 200)
  }, [])

  return (
    <Flex>
      <Flex ref={ref} background="elementBackground" border padding={[4]}>
        Target
      </Flex>
      {ref.current && (
        <Drop target={ref.current} align={{ top: "bottom", left: "left" }}>
          <Flex background="dropdown" padding={[6]}>
            {longText}
          </Flex>
        </Drop>
      )}
      {ref.current && (
        <Drop target={ref.current} align={{ bottom: "top", right: "right" }}>
          <Flex background="dropdown" padding={[6]}>
            {longText}
          </Flex>
        </Drop>
      )}
    </Flex>
  )
}

const DropBackdrop = () => {
  const ref = useRef()

  const [, setShowDrop] = useState(false)
  useEffect(() => {
    setTimeout(() => setShowDrop(true), 200)
  }, [])

  return (
    <Flex height="200px">
      <Flex ref={ref} background="elementBackground" border padding={[2, 4]}>
        <Text>Open alert</Text>
      </Flex>
      {ref.current && (
        <Drop
          backdrop
          target={ref.current}
          align={{ top: "bottom", left: "left" }}
          onClickOutside={action("onClickOutside")}
          onEsc={action("onEsc")}
        >
          <Flex background="dropdown" padding={[3]}>
            <Text>disk_space_usage on node-eu-01 is critical</Text>
          </Flex>
        </Drop>
      )}
    </Flex>
  )
}

export const WithBackdrop = { render: () => <DropBackdrop /> }

const alignDescription =
  "Where the drop attaches. Keys are drop edges (`top`, `bottom`, `left`, `right`) and values are the target edge they attach to."

export default {
  title: "Components/Drops/Drop",
  component: Drop,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A floating container that follows a target element and is portaled to the drop layer. It is the base for Menu, Tooltip and Popover; use it directly when you need custom floating content.",
      },
    },
  },
  argTypes: {
    target: {
      description: "DOM element the drop is positioned against. Required.",
      control: false,
      table: { type: { summary: "HTMLElement" } },
    },
    align: {
      description: alignDescription,
      control: "object",
      table: {
        type: { summary: "{ top?, bottom?, left?, right? }" },
        defaultValue: { summary: '{ top: "bottom", left: "left" }' },
      },
    },
    stretch: {
      description:
        "Match the target width (`width`), the target alignment edge (`align`), or neither (`false`).",
      control: "select",
      options: ["width", "align", false],
      table: {
        type: { summary: 'boolean | "width" | "align"' },
        defaultValue: { summary: '"width"' },
      },
    },
    backdrop: {
      description:
        "Render a dimmed, blurred backdrop behind the drop. Clicking it calls onClickOutside.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    backdropProps: {
      description: "Props passed to the backdrop element.",
      control: "object",
      table: { type: { summary: "object" }, defaultValue: { summary: "{}" } },
    },
    canHideTarget: {
      description: "Allow the drop to cover its target when there is no other room.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    keepHorizontal: {
      description: "Keep the horizontal position fixed when the drop is repositioned.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "undefined" } },
    },
    dataDrop: {
      description: "Value of the data-drop attribute; also used by the outside-click check.",
      control: "text",
      table: { type: { summary: "string" }, defaultValue: { summary: '"drop-content"' } },
    },
    onClickOutside: {
      description: "Called when the user clicks outside the drop and its target.",
      action: "onClickOutside",
      table: { type: { summary: "(event) => void" } },
    },
    onEsc: {
      description: "Called when the user presses Escape.",
      action: "onEsc",
      table: { type: { summary: "() => void" } },
    },
    hideShadow: {
      description: "Remove the floating shadow, for content that draws its own.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    animation: {
      description: "Fade and lift the drop in over 120ms. Disabled under reduced motion.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "undefined" } },
    },
    noEvents: {
      description: "Make the drop ignore pointer events.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "undefined" } },
    },
    zIndex: {
      description: "Stacking order of the drop.",
      control: "number",
      table: { type: { summary: "number" }, defaultValue: { summary: "70" } },
    },
    children: {
      description: "Content of the drop.",
      control: false,
      table: { type: { summary: "ReactNode" } },
    },
  },
}
