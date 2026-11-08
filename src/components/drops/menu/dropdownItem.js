import React from "react"
import styled, { css } from "styled-components"
import { getColor, getSizeBy } from "@/theme"
import Flex from "@/components/templates/flex"
import { TextSmall } from "@/components/typography"
import { insetMenuRowRound, menuSelectionMarker } from "../dropdownStyles"

const Label = styled(TextSmall)`
  min-width: 0;
`

export const ItemContainer = styled(Flex).attrs(props => ({
  as: "li",
  role: "option",
  padding: [2, 2.5],
  round: props.justDesc ? undefined : insetMenuRowRound,
  color: props.selected ? "menuItemSelectedText" : "text",
  ...props,
}))`
  ${({ alignItems }) => !alignItems && "align-items: center;"}
  ${({ height }) =>
    height === undefined &&
    css`
      min-height: ${getSizeBy(4.25)};
    `}
  cursor: ${({ cursor }) => cursor ?? "pointer"};
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  transition: background-color 120ms ease-out;

  &:hover {
    background-color: ${getColor("menuItemHover")};
  }

  ${({ justDesc, theme }) =>
    justDesc &&
    `
    pointer-events: none;
    border-top: 1px solid ${getColor("separator")({ theme })};
    & > * {
      color: ${getColor("textLite")({ theme })}
    }
  `}

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${getColor("menuItemSelected")};
      box-shadow: ${menuSelectionMarker};

      &:hover {
        background-color: ${getColor("menuItemSelectedHover")};
      }
    `}

  /* Styling hook only: consumers that make rows focusable or track an active row get a visible ring. */
  &:focus-visible,
  &[data-focused="true"] {
    outline: none;
    box-shadow: ${({ selected }) =>
        selected
          ? css`
              ${menuSelectionMarker},
            `
          : ""}
      inset 0 0 0 2px ${getColor("primary")};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const DropdownItem = ({
  item: { value, label, icon, reverse, disabled, onClick, ...restItem },
  value: selectedValue,
  onItemClick,
  index,
  style,
  ...rest
}) => {
  const selected = selectedValue === value

  const name = (
    <Label
      color="inherit"
      truncate={typeof label === "string"}
      title={typeof label === "string" ? label : undefined}
    >
      {label}
    </Label>
  )

  const onSelect = event => {
    if (onClick) onClick(event)
    onItemClick(value)
  }

  return (
    <ItemContainer
      data-index={index}
      aria-selected={selected}
      gap={2}
      disabled={disabled}
      selected={selected}
      onClick={onSelect}
      {...restItem}
      {...rest}
      style={style}
    >
      {reverse && name}
      {icon}
      {!reverse && name}
    </ItemContainer>
  )
}

export default DropdownItem
