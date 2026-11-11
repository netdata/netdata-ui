import { Children, isValidElement, cloneElement } from "react"
import Flex from "@/components/templates/flex"
import { Button } from "./button"
import { SegmentedTrack, SegmentedItem, RaisedSegmentedItem } from "./segmented"

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

const isItemSelected = (item, value) =>
  value === item.value || (Array.isArray(value) && value.includes(item.value))

const nextValue = (item, value, isMulti) => {
  if (!isMulti) return item.value
  if (!Array.isArray(value)) return [item.value]
  return value.includes(item.value) ? value.filter(v => v !== item.value) : [...value, item.value]
}

const SegmentedItems = ({
  items,
  value,
  isMulti,
  appearance,
  compact,
  buttonProps = {},
  onChange,
}) => {
  const Item = appearance === "raised" ? RaisedSegmentedItem : SegmentedItem
  return items.map(item => {
    const isSelected = isItemSelected(item, value)
    const callerProps = { ...buttonProps, ...item.buttonProps }
    const isAriaDisabled =
      callerProps["aria-disabled"] === true || callerProps["aria-disabled"] === "true"
    return (
      <Item
        key={String(item.value)}
        compact={compact}
        active={isSelected}
        aria-pressed={isSelected}
        onClick={() => {
          if (!isAriaDisabled) onChange(nextValue(item, value, isMulti))
        }}
        {...(item.title ? { title: item.title } : {})}
        {...callerProps}
      >
        {item.label}
      </Item>
    )
  })
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
        const isSelected = isItemSelected(item, value)
        const onClick = () => onChange(nextValue(item, value, isMulti))

        // Unselected segments read as neutral so only the selection carries green, unless the caller asked for a colour.
        const callerProps = { ...buttonProps, ...item.buttonProps }
        const neutralSegment =
          !isSelected && !callerProps.danger && !callerProps.warning && !callerProps.color

        return (
          <ButtonComponent
            key={item.value}
            label={item.label}
            onClick={onClick}
            {...(item.title ? { title: item.title } : {})}
            {...(!isSelected ? { flavour: "hollow" } : {})}
            {...(neutralSegment ? { neutral: true } : {})}
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
  variant,
  appearance,
  compact,
  ...props
}) =>
  variant === "segmented" ? (
    <SegmentedTrack role="group" appearance={appearance} compact={compact} {...props}>
      {items?.length ? (
        <SegmentedItems
          items={items}
          value={value}
          isMulti={isMulti}
          onChange={onChange}
          buttonProps={buttonProps}
          appearance={appearance}
          compact={compact}
        />
      ) : (
        children
      )}
    </SegmentedTrack>
  ) : (
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
