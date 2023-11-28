import React, { forwardRef, useState } from "react"
import { Text } from "@/components/typography"
import { Icon, Flex } from "@/index"
import MultipleContainers from "."
import Item from "./baseitem"

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const initialDynamicContainers = {
  A: [{ id: "a", left: 0, top: 0, width: 4, height: 5 }],
  B: [
    { id: "b", left: 0, top: 0, width: 6, height: 3 },
    { id: "c", left: 6, top: 0, width: 3, height: 2 },
    { id: "d", left: 6, top: 3, width: 3, height: 1 }, //, 34, 35, 43, 44, 45, 53, 54, 55
  ],
}

export const Grid = () => {
  const [dynamicContainers, setDynamicContainers] = useState(() => initialDynamicContainers)

  const onClose = tabIndex => {
    const result = Array.from(dynamicContainers)
    result.splice(tabIndex, 1)
    setDynamicContainers(result)
  }

  const onDragEnd = (activeIndex, overIndex) => {
    setDynamicContainers(reorder(dynamicContainers, activeIndex, overIndex))
  }

  const onAddClick = () => {
    const item = { icon: "node_hollow", title: `centos-super-node-${Math.random() * 10}` }
    setDynamicContainers([...dynamicContainers, item])
  }

  return (
    <>
      <button style={{ position: "absolute", top: 0, left: 0 }} onClick={onAddClick}>
        Add +
      </button>
      <Flex width="800px" column position="relative">
        <MultipleContainers
          Container={props => <Flex flexWrap {...props} />}
          onDragEnd={onDragEnd}
          onRemove={onClose}
          items={dynamicContainers}
          onResize={(...args) => console.log(...args)}
          width={800}
          Item={forwardRef(({ icon, title, index, ...rest }, ref) => (
            <Item
              ref={ref}
              {...rest}
              showBorderLeft={index === 0}
              icon={<Icon name={icon} size="small" />}
              key={title}
              tabIndex={index}
            >
              <Text truncate>{title}</Text>
            </Item>
          ))}
        />
      </Flex>
    </>
  )
}

export default {
  component: MultipleContainers,
}
