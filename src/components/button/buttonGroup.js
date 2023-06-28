import React, { Children, isValidElement, cloneElement } from "react"
import Flex from "src/components/templates/flex"
import { Button } from "./button"

const getButtonGroupProps = (itemIndex, itemsLength) => {
  const groupFirst = itemIndex == 0
  const groupLast = itemIndex == itemsLength - 1

  return {
    groupFirst,
    groupLast,
    groupMiddle: !groupFirst && !groupLast,
  }
}

const Content = ({ children }) => {
  const renderedChildren = Children.toArray(children).length

  return (
    <>
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          const buttonGroupProps = getButtonGroupProps(index, renderedChildren)
          return cloneElement(child, buttonGroupProps)
        }

        return child
      })}
    </>
  )
}

const RadioButtons = ({ items, checked, onChange }) => (
  <>
    {items.map(({ label, value }, index) => {
      const buttonGroupProps = getButtonGroupProps(index, items.length)
      return (
        <Button
          key={value}
          label={label}
          onClick={() => onChange(value)}
          {...(checked != value ? { flavour: "hollow" } : {})}
          {...buttonGroupProps}
        />
      )
    })}
  </>
)

export const ButtonGroup = ({ items, checked, onChange, children, ...props }) => (
  <Flex alignItems="center" {...props}>
    {items?.length ? (
      <RadioButtons items={items} checked={checked} onChange={onChange} />
    ) : (
      <Content>{children}</Content>
    )}
  </Flex>
)
