import { useState } from "react"
import Flex from "@/components/templates/flex"
import { TextSmall } from "@/components/typography"
import Pill from "@/components/pill"
import { Tabs, Tab } from "."

const Counter = ({ label, count, active }) => (
  <Flex alignItems="center" gap={1.5}>
    <TextSmall color={active ? "primary" : "text"}>{label}</TextSmall>
    {/* Counts are not status: the selected counter only steps its ink, the underline marks selection. */}
    <Pill size="small" flavour="neutral" color={active ? "main" : "text"}>
      {count}
    </Pill>
  </Flex>
)

// The global on* action regex injects onChange, which would make this uncontrolled story controlled.
// eslint-disable-next-line no-unused-vars
export const Basic = ({ onChange, ...args }) => (
  <Tabs {...args}>
    <Tab label="Overview">Overview content</Tab>
    <Tab label="Nodes">Nodes content</Tab>
    <Tab label="Alerts">Alerts content</Tab>
    <Tab label="Billing" disabled>
      Billing content
    </Tab>
  </Tabs>
)

export const Controlled = () => {
  const [selected, setSelected] = useState(1)
  return (
    <Tabs selected={selected} onChange={setSelected}>
      <Tab label="Overview">Overview content</Tab>
      <Tab label="Nodes">Nodes content</Tab>
      <Tab label="Alerts">Alerts content</Tab>
    </Tabs>
  )
}

export const WithCounters = () => (
  <Tabs>
    <Tab label={({ active }) => <Counter label="Nodes" count={128} active={active} />}>Nodes</Tab>
    <Tab label={({ active }) => <Counter label="Alerts" count={3} active={active} />}>Alerts</Tab>
    <Tab label={({ active }) => <Counter label="Rooms" count={12} active={active} />}>Rooms</Tab>
  </Tabs>
)

export const Flavours = () => (
  <Flex column gap={4}>
    {["success", "warning", "error", "default"].map(flavour => (
      <Tabs key={flavour}>
        <Tab label={`Active ${flavour}`} flavour={flavour}>
          {flavour}
        </Tab>
        <Tab label="Inactive" flavour={flavour}>
          inactive
        </Tab>
      </Tabs>
    ))}
  </Flex>
)

export const Sizes = () => (
  <Flex column gap={4}>
    <Tabs>
      <Tab label="Default 32px">a</Tab>
      <Tab label="Second">b</Tab>
    </Tabs>
    <Tabs>
      <Tab label="Large 40px" small={false}>
        a
      </Tab>
      <Tab label="Second" small={false}>
        b
      </Tab>
    </Tabs>
    <Tabs>
      <Tab label="Green 24px" green>
        a
      </Tab>
      <Tab label="Second" green>
        b
      </Tab>
    </Tabs>
  </Flex>
)

export const SpanLabels = () => (
  <Tabs>
    <Tab label={<TextSmall>Span label</TextSmall>}>a</Tab>
    <Tab label={<TextSmall>Inactive span</TextSmall>}>b</Tab>
  </Tabs>
)

export const NoDefaultBorder = () => (
  <Tabs noDefaultBorder>
    <Tab label="Overview">a</Tab>
    <Tab label="Nodes">b</Tab>
  </Tabs>
)

export const States = () => (
  <Flex column gap={4}>
    <Tabs>
      <Tab label="Active (selected)">Selected tab content</Tab>
      <Tab label="Rest">Rest content</Tab>
      <Tab label="Disabled" disabled>
        Disabled content
      </Tab>
    </Tabs>
    <Tabs>
      <Tab label="system.cpu" maxWidth="96px">
        CPU
      </Tab>
      <Tab label="A very long tab label that is truncated by maxWidth" maxWidth="160px">
        Long
      </Tab>
    </Tabs>
  </Flex>
)

const variantTabs = [
  { label: "Overview", icon: "dashboard" },
  { label: "Nodes", icon: "nodes", count: 128 },
  { label: "Alerts", icon: "alarm", count: 10 },
  { label: "Metrics", icon: "charts", count: 2140 },
]

const VariantStrip = ({ variant }) => (
  <Tabs variant={variant}>
    {variantTabs.map(({ label, icon, count }) => (
      <Tab key={label} label={label} icon={icon} count={count}>
        {`${label} content`}
      </Tab>
    ))}
  </Tabs>
)

export const Variants = () => (
  <Flex column gap={4}>
    <Flex column gap={1}>
      <TextSmall color="textLite">variant=&quot;line&quot; (default)</TextSmall>
      <VariantStrip variant="line" />
    </Flex>
    <Flex column gap={1}>
      <TextSmall color="textLite">variant=&quot;contained&quot;</TextSmall>
      <VariantStrip variant="contained" />
    </Flex>
    <Flex column gap={1}>
      <TextSmall color="textLite">Plain labels</TextSmall>
      <Tabs variant="contained">
        <Tab label="Charts">Charts content</Tab>
        <Tab label="Table">Table content</Tab>
        <Tab label="Disabled" disabled>
          Disabled content
        </Tab>
      </Tabs>
    </Flex>
  </Flex>
)
Variants.parameters = {
  docs: {
    description: {
      story:
        "line draws an underline under the selected tab; contained raises it on a track. Each Tab takes an `icon` (16px, before the label) and a `count` (muted 12px, after the label).",
    },
  },
}

export default {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A horizontal tab strip with a content area. Use it to switch between sibling views of the same page, such as Overview, Nodes and Alerts.",
      },
    },
  },
  args: { noDefaultBorder: false, variant: "line" },
  argTypes: {
    variant: {
      description:
        "Look of the strip. line underlines the selected tab; contained draws a track and raises the selected tab, ignoring flavour and noDefaultBorder.",
      control: "inline-radio",
      options: ["line", "contained"],
      table: { type: { summary: '"line" | "contained"' }, defaultValue: { summary: '"line"' } },
    },
    icon: {
      description: "Tab prop. Icon name rendered at 16px before the label.",
      control: false,
      table: { category: "Tab", type: { summary: "string" } },
    },
    count: {
      description: "Tab prop. Number shown after the label as a muted 12px tabular count.",
      control: false,
      table: { category: "Tab", type: { summary: "number" } },
    },
    selected: {
      description: "Index of the selected tab. Set together with onChange for a controlled strip.",
      control: { type: "number", min: 0 },
      table: { type: { summary: "number" }, defaultValue: { summary: "0" } },
    },
    onChange: {
      // No action here: an injected handler would make every story controlled and freeze tab clicks.
      description: "Called with the clicked tab index. When set, the parent owns the selection.",
      control: false,
      table: { type: { summary: "(index: number) => void" } },
    },
    noDefaultBorder: {
      description: "Hides the bottom border of the tab strip.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "undefined" } },
    },
    TabsHeader: {
      description: "Component that wraps the tab strip.",
      control: false,
      table: { type: { summary: "ComponentType" }, defaultValue: { summary: "Fragment" } },
    },
    TabContent: {
      description: "Component that wraps the selected tab content.",
      control: false,
      table: { type: { summary: "ComponentType" }, defaultValue: { summary: "Fragment" } },
    },
    tabsProps: {
      description: "Props passed to the tab strip (nav) element.",
      control: false,
      table: { type: { summary: "object" } },
    },
    tabHeaderProps: {
      description: "Props passed to TabsHeader.",
      control: false,
      table: { type: { summary: "object" } },
    },
    tabContentProps: {
      description: "Props passed to TabContent.",
      control: false,
      table: { type: { summary: "object" } },
    },
    className: {
      description: "Class name applied to the wrapper.",
      control: false,
      table: { type: { summary: "string" } },
    },
  },
}
