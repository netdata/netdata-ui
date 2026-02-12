import React, { Children, isValidElement, cloneElement } from "react"
import Flex from "@/components/templates/flex"
import { Button } from "./button"

const noop = () => {}

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

const RadioButtons = ({
  items,
  value,
  isMulti,
  ButtonComponent = Button,
  buttonProps = {},
  onChange,
}) => {
  return (
    <>
      {items.map((item, index) => {
        const buttonGroupProps = getButtonGroupProps(index, items.length)
        const isSelected =
          value === item.value || (Array.isArray(value) && value.includes(item.value))

        const onClick = () => {
          if (isMulti) {
            const newValue = Array.isArray(value)
              ? value.includes(item.value)
                ? value.filter(v => v !== item.value)
                : [...value, item.value]
              : [item.value]
            onChange(newValue)
          } else {
            onChange(item.value)
          }
        }

        return (
          <ButtonComponent
            key={item.value}
            label={item.label}
            onClick={onClick}
            {...(item.title ? { title: item.title } : {})}
            {...(!isSelected ? { flavour: "hollow" } : {})}
            {...buttonGroupProps}
            {...buttonProps}
            {...(item.buttonProps || {})}
          />
        )
      })}
    </>
  )
}

export const ButtonGroup = ({
  items,
  value,
  isMulti,
  onChange = noop,
  children,
  ButtonComponent,
  buttonProps,
  ...props
}) => (
  <Flex alignItems="center" {...props}>
    {items?.length ? (
      <RadioButtons
        items={items}
        value={value}
        isMulti={isMulti}
        onChange={onChange}
        ButtonComponent={ButtonComponent}
        buttonProps={buttonProps}
      />
    ) : (
      <Content>{children}</Content>
    )}
  </Flex>
)
