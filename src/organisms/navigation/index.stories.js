import { storiesOf } from "@storybook/react"
import React, { useState } from "react"
import { Tabs, Tab, TabSeparator, DraggableTabs } from "."
import { Text } from "src/components/typography"
import { Icon, Flex } from "src/index"

const story = storiesOf("ORGANISMS|Tabbed Navigation/Tabbed Navigation", module)

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const staticTabs = [
  { title: "Overview", icon: "room_overview" },
  { title: "Nodes", icon: "nodes_hollow" },
  { title: "Dashboards", icon: "dashboard" },
]

const initialDynamicTabs = [
  { icon: "node_hollow", title: "Just a node" },
  { icon: "node_hollow", title: "Just another node" },
  { icon: "node_hollow", title: "super duper long string to handle" },
  { icon: "node_hollow", title: "9fb7ab5e-2aaf-11eb-b77f-ede966ae97e1" },
  { icon: "node_hollow", title: "9fb7ab5e-2aaf-11eb-b77f-ede966ae97e1" },
  { icon: "node_hollow", title: "9fb7ab5e-2aaf-11eb-b77f-ede966ae97e1" },
]

story.add("Tabbed navigation", () => {
  const [dynamicTabs, setDynamicTabs] = useState(() => initialDynamicTabs)
  const [index, setIndex] = useState(0)

  const onActive = nextIndex => setIndex(nextIndex)

  const onClose = tabIndex => {
    const result = Array.from(dynamicTabs)
    result.splice(tabIndex, 1)
    setDynamicTabs(result)
  }

  const onDragEnd = ({ destination, source }) => {
    const result = reorder(dynamicTabs, source.index, destination.index)
    setDynamicTabs(result)
  }

  const onAddClick = () => {
    const item = { icon: "node_hollow", title: `centos-super-node-${Math.random() * 10}` }
    setDynamicTabs([...dynamicTabs, item])
  }

  return (
    <>
      <button style={{ position: "absolute", top: 0, left: 0 }} onClick={onAddClick}>
        Add +
      </button>
      <Flex width="100vw">
        <Tabs onActive={onActive}>
          {staticTabs.map(({ icon, title }) => (
            <Tab icon={<Icon name={icon} size="small" />} key={title}>
              <Text>{title}</Text>
            </Tab>
          ))}
          <TabSeparator />
          <DraggableTabs onDragEnd={onDragEnd}>
            {dynamicTabs.map(({ icon, title }, i) => (
              <Tab
                icon={<Icon name={icon} size="small" />}
                onClose={onClose}
                key={title}
                tabIndex={i}
                active={false}
              >
                <Text truncate>{title}</Text>
              </Tab>
            ))}
          </DraggableTabs>
        </Tabs>
      </Flex>
    </>
  )
})
