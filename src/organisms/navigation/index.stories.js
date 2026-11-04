import React, { useState } from "react"
import { Tabs, Tab, TabSeparator, Sortable } from "."
import { Text } from "@/components/typography"
import { Icon, Flex } from "@/index"

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const staticTabs = [
  { id: "Overview", title: "Overview", icon: "room_overview" },
  { id: "Nodes", title: "Nodes", icon: "nodes_hollow" },
  { id: "Dashboards", title: "Dashboards", icon: "dashboard" },
]

const initialDynamicTabs = [
  { id: 1110, icon: "node_hollow", title: "Just a node" },
  { id: 1, icon: "node_hollow", title: "Just another node" },
  { id: 2, icon: "node_hollow", title: "super duper long string to handle" },
  { id: 3, icon: "node_hollow", title: "9fb7ab5e-2aaf-11eb-b77f-ede966ae97e1" },
  { id: 4, icon: "node_hollow", title: "9fb7ab5e-2aaf-11eb-b77f-ede966ae97e1" },
  { id: 5, icon: "node_hollow", title: "9fb7ab5e-2aaf-11eb-b77f-ede966ae97e1" },
  { id: 13, icon: "node_hollow", title: "9fb7ab5e-2aaf-11eb-b77f-ede966ae97e1" },
  { id: 14, icon: "node_hollow", title: "9fb7ab5e-2aaf-11eb-b77f-ede966ae97e1" },
  { id: 15, icon: "node_hollow", title: "9fb7ab5e-2aaf-11eb-b77f-ede966ae97e1" },
  { id: 23, icon: "node_hollow", title: "9fb7ab5e-2aaf-11eb-b77f-ede966ae97e1" },
  { id: 24, icon: "node_hollow", title: "9fb7ab5e-2aaf-11eb-b77f-ede966ae97e1" },
  { id: 25, icon: "node_hollow", title: "9fb7ab5e-2aaf-11eb-b77f-ede966ae97e1" },
  { id: 33, icon: "node_hollow", title: "9fb7ab5e-2aaf-11eb-b77f-ede966ae97e1" },
  { id: 34, icon: "node_hollow", title: "9fb7ab5e-2aaf-11eb-b77f-ede966ae97e1" },
  { id: 35, icon: "node_hollow", title: "9fb7ab5e-2aaf-11eb-b77f-ede966ae97e1" },
  { id: 43, icon: "node_hollow", title: "9fb7ab5e-2aaf-11eb-b77f-ede966ae97e1" },
  { id: 44, icon: "node_hollow", title: "9fb7ab5e-2aaf-11eb-b77f-ede966ae97e1" },
  { id: 45, icon: "node_hollow", title: "9fb7ab5e-2aaf-11eb-b77f-ede966ae97e1" },
  { id: 53, icon: "node_hollow", title: "9fb7ab5e-2aaf-11eb-b77f-ede966ae97e1" },
  { id: 54, icon: "node_hollow", title: "9fb7ab5e-2aaf-11eb-b77f-ede966ae97e1" },
  { id: 55, icon: "node_hollow", title: "9fb7ab5e-2aaf-11eb-b77f-ede966ae97e1" },
]

export const TabbedNavigation = () => {
  const [dynamicTabs, setDynamicTabs] = useState(() => initialDynamicTabs)

  const onClose = tabIndex => {
    const result = Array.from(dynamicTabs)
    result.splice(tabIndex, 1)
    setDynamicTabs(result)
  }

  const onDragEnd = (activeIndex, overIndex) => {
    setDynamicTabs(reorder(dynamicTabs, activeIndex, overIndex))
  }

  const onAddClick = () => {
    const item = { icon: "node_hollow", title: `centos-super-node-${Math.random() * 10}` }
    setDynamicTabs([...dynamicTabs, item])
  }

  const [activeTab, setActiveTab] = React.useState(0)

  return (
    <>
      <button style={{ position: "absolute", top: 0, left: 0 }} onClick={onAddClick}>
        Add +
      </button>
      <Flex width="800px">
        <Tabs>
          {staticTabs.map(({ icon, title }) => (
            <Tab fixed icon={<Icon name={icon} size="small" />} key={title}>
              <Text>{title}</Text>
            </Tab>
          ))}
          <TabSeparator />
          <Sortable
            onDragEnd={onDragEnd}
            onTabClose={onClose}
            items={dynamicTabs}
            onResize={(...args) => console.log(...args)}
            Item={({ icon, title, index, ref, ...rest }) => (
              <Tab
                ref={ref}
                {...rest}
                showBorderLeft={index === 0}
                onActivate={() => setActiveTab(index)}
                icon={<Icon name={icon} size="small" />}
                key={title}
                tabIndex={index}
                active={index === activeTab}
              >
                <Text truncate>{title}</Text>
              </Tab>
            )}
          />
        </Tabs>
      </Flex>
    </>
  )
}

export const StaticTabsWithActivate = () => {
  const [activeTab, setActiveTab] = React.useState(0)
  return (
    <>
      <Flex width="100vw">
        <Tabs>
          {staticTabs.map(({ icon, title }, index) => (
            <Tab
              active={index === activeTab}
              onActivate={() => setActiveTab(index)}
              fixed
              icon={<Icon name={icon} size="small" />}
              key={title}
            >
              <Text>{title}</Text>
            </Tab>
          ))}
        </Tabs>
      </Flex>
    </>
  )
}

const StateTab = ({ label, ...props }) => (
  <Tab icon={<Icon name="node_hollow" size="small" />} {...props}>
    <Text truncate>{label}</Text>
  </Tab>
)

// Hover is live: point at any non-fixed tab to see the close button and drag handle.
export const TabStates = () => (
  <Flex column gap={4} width="800px">
    <Tabs>
      <StateTab fixed active label="Active (fixed)" />
      <StateTab fixed label="Inactive (fixed)" />
      <TabSeparator />
      <StateTab draggable showBorderLeft label="Draggable" />
      <StateTab draggable active label="Draggable active" />
      <StateTab draggable dragging label="Drag source placeholder" />
    </Tabs>
    <Flex>
      <StateTab isDragOverlay draggable label="Drag overlay" />
    </Flex>
    <Tabs>
      <StateTab fixed active collapsed label="Collapsed" />
      <StateTab fixed collapsed label="Collapsed" />
    </Tabs>
  </Flex>
)

const summary = (type, def) => ({
  table: { type: { summary: type }, ...(def !== undefined && { defaultValue: { summary: def } }) },
})

export default {
  title: "Organisms/Navigation",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Tabs, Tab, TabSeparator and Sortable build a horizontal tab bar. Use fixed tabs for primary views and Sortable for tabs the user can close, reorder and scroll, such as open nodes.",
      },
    },
  },
  argTypes: {
    children: {
      description: "Tab and TabSeparator elements, or a Sortable list.",
      control: false,
      ...summary("ReactNode"),
    },
    subTabs: {
      description: "Optional element rendered under the tab row. It receives the collapsed flag.",
      control: false,
      ...summary("ReactElement", "undefined"),
    },
    active: {
      description: "Tab prop. Marks the tab as the current one.",
      control: "boolean",
      ...summary("boolean", "undefined"),
    },
    fixed: {
      description: "Tab prop. A fixed tab has no close button.",
      control: "boolean",
      ...summary("boolean", "undefined"),
    },
    draggable: {
      description: "Tab prop. Shows the drag handle.",
      control: "boolean",
      ...summary("boolean", "undefined"),
    },
    icon: {
      description: "Tab prop. Icon element shown before the label.",
      control: false,
      ...summary("ReactElement", "undefined"),
    },
    showBorderLeft: {
      description: "Tab prop. Draws a divider on the left edge.",
      control: "boolean",
      ...summary("boolean", "undefined"),
    },
    onActivate: {
      description: "Tab prop. Called when the tab is clicked.",
      action: "onActivate",
      ...summary("() => void", "undefined"),
    },
    onRemove: {
      description: "Tab prop. Called with (index, active) when the close button is clicked.",
      action: "onRemove",
      ...summary("(index, active) => void", "undefined"),
    },
    items: {
      description: "Sortable prop. Array of tab data objects, each with a unique id.",
      control: false,
      ...summary("Array<{ id, fixed? }>"),
    },
    Item: {
      description: "Sortable prop. Component that renders one item as a Tab.",
      control: false,
      ...summary("ElementType"),
    },
    onDragEnd: {
      description: "Sortable prop. Called with (activeIndex, overIndex) after a reorder.",
      action: "onDragEnd",
      ...summary("(from, to) => void"),
    },
    onTabClose: {
      description: "Sortable prop. Called with the tab index when a tab is closed.",
      action: "onTabClose",
      ...summary("(index) => void"),
    },
    onResize: {
      description: "Sortable prop. Called when the tab row overflows or fits again.",
      action: "onResize",
      ...summary("(collapsed) => void"),
    },
  },
}
