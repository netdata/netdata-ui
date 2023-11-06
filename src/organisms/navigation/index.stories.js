import React, { forwardRef, useState } from "react"
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
            Item={forwardRef(({ icon, title, index, ...rest }, ref) => (
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
            ))}
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

export default {
  component: Tabs,
}
