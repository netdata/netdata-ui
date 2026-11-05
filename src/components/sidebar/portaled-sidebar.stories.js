import React from "react"
import useToggle from "@/hooks/useToggle"
import Flex from "@/components/templates/flex"
import { Button } from "@/components/button"
import { ModalCloseButton } from "@/components/modal"
import { H4, Text } from "@/components/typography"
import { PortalSidebar } from "./portaled-sidebar"
import { Sidebar } from "./sidebar"

const Row = ({ label, value }) => (
  <Flex justifyContent="between">
    <Text color="textLite">{label}</Text>
    <Text color="main" style={{ fontVariantNumeric: "tabular-nums" }}>
      {value}
    </Text>
  </Flex>
)

const Panel = ({ onClose }) => (
  <Flex column height="100%">
    <Flex alignItems="center" justifyContent="between" padding={[3, 4]} border={{ side: "bottom" }}>
      <H4 margin={[0]}>Node details</H4>
      <ModalCloseButton onClose={onClose} position="static" />
    </Flex>
    <Flex column gap={2} padding={[3, 4]}>
      <Row label="CPU" value="42.7%" />
      <Row label="Memory" value="6.12 GiB" />
      <Row label="Uptime" value="18d 04:11" />
    </Flex>
  </Flex>
)

const Demo = ({ right }) => {
  const [open, toggle] = useToggle(true)

  return (
    <Flex padding={[4]}>
      <Button label={open ? "close panel" : "open panel"} onClick={toggle} />
      {open && (
        <PortalSidebar right={right} closeOnEsc closeOnOverlayClick onClose={toggle}>
          <Panel onClose={toggle} />
        </PortalSidebar>
      )}
    </Flex>
  )
}

export const PortaledLeft = () => <Demo />

export const PortaledRight = () => <Demo right />

export const SplitView = () => (
  <Sidebar info={<Flex padding={[4]}>Info box (unchanged legacy styling)</Flex>}>
    <Flex padding={[4]}>Sidebar content</Flex>
  </Sidebar>
)

export const SplitViewRight = () => (
  <Sidebar right info={<Flex padding={[4]}>Alerts overview</Flex>}>
    <Flex column gap={2} padding={[4]}>
      <Text strong>web-prod-03</Text>
      <Text color="textLite">disk_space._ at 91%</Text>
    </Flex>
  </Sidebar>
)

export const Empty = () => <Sidebar />

const prop = (description, type, defaultValue, control) => ({
  description,
  control,
  table: { type: { summary: type }, defaultValue: { summary: defaultValue } },
})

export default {
  title: "Components/Sidebar/Portaled Sidebar",
  component: PortalSidebar,
  subcomponents: { Sidebar },
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A panel that slides over half of the viewport from the left or right, portaled to the body with a scrim behind it. Use it for details of a selected item, such as a node. The split-view Sidebar lays out a panel and an info area side by side without a portal.",
      },
      story: { inline: false, height: "420px" },
    },
  },
  argTypes: {
    right: prop("Attach to the right edge instead of the left.", "boolean", "false", "boolean"),
    closeOnEsc: prop("Call onClose when Escape is pressed.", "boolean", "false", "boolean"),
    closeOnOverlayClick: prop(
      "Call onClose when the scrim is clicked.",
      "boolean",
      "false",
      "boolean"
    ),
    onClose: {
      description: "Called when the panel asks to close.",
      control: false,
      action: "onClose",
      table: { type: { summary: "() => void" }, defaultValue: { summary: "() => {}" } },
    },
    className: prop(
      "Class name for the panel, for styled() overrides.",
      "string",
      "undefined",
      "text"
    ),
    Wrapper: {
      description: "Component wrapping the panel inside the portal.",
      control: false,
      table: { type: { summary: "ElementType" }, defaultValue: { summary: "Fragment" } },
    },
    children: {
      description: "Panel content.",
      control: false,
      table: { type: { summary: "ReactNode" } },
    },
  },
}
