import React from "react"
import styled from "styled-components"
import { getColor } from "src/theme"
import Flex from "src/components/templates/flex"
import { Text } from "src/components/typography"

export const ItemContainer = styled(Flex).attrs({
  as: "li",
  role: "option",
  padding: [2, 4],
})`
  cursor: ${({ cursor }) => cursor ?? "pointer"};
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  alignitems: ${({ alignItems }) => alignItems ?? "center"};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  &:hover {
    background-color: ${props => getColor("borderSecondary")(props)};
  }
`

const DropdownItem = ({
  item: { value, label, icon, reverse, disabled, onClick, ...restItem },
  value: selectedValue,
  onItemClick,
  ...rest
}) => {
  const selected = selectedValue === value

  const onSelect = event => {
    if (onClick) onClick(event)
    onItemClick(value)
  }

  return (
    <ItemContainer
      aria-selected={selected}
      disabled={disabled || selected}
      onClick={onSelect}
      {...restItem}
      {...rest}
    >
      {reverse && <Text>{label}</Text>}
      {icon}
      {!reverse && <Text>{label}</Text>}
    </ItemContainer>
  )
}

export default DropdownItem
