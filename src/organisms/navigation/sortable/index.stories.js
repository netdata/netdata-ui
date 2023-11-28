import React, { forwardRef, useState } from "react"
import { Text } from "@/components/typography"
import { Icon, Flex } from "@/index"

import {
  arraySwap,
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  rectSwappingStrategy,
} from "@dnd-kit/sortable"

import Tab from "../tab"
import Sortable from "."

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const initialDynamicBoxes = [
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

export const Grid = () => {
  const [dynamicBoxes, setDynamicBoxes] = useState(() => initialDynamicBoxes)

  const onClose = tabIndex => {
    const result = Array.from(dynamicBoxes)
    result.splice(tabIndex, 1)
    setDynamicBoxes(result)
  }

  const onDragEnd = (activeIndex, overIndex) => {
    setDynamicBoxes(reorder(dynamicBoxes, activeIndex, overIndex))
  }

  const onAddClick = () => {
    const item = { icon: "node_hollow", title: `centos-super-node-${Math.random() * 10}` }
    setDynamicBoxes([...dynamicBoxes, item])
  }

  const [activeTab, setActiveTab] = React.useState(0)

  return (
    <>
      <button style={{ position: "absolute", top: 0, left: 0 }} onClick={onAddClick}>
        Add +
      </button>
      <Flex width="800px">
        <Sortable
          Container={props => <Flex flexWrap {...props} />}
          onDragEnd={onDragEnd}
          onTabClose={onClose}
          items={dynamicBoxes}
          onResize={(...args) => console.log(...args)}
          strategy={rectSwappingStrategy}
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
      </Flex>
    </>
  )
}

export default {
  component: Sortable,
}
