import React from "react"
import styled from "styled-components"
import { getColor } from "@/theme"
import Flex from "@/components/templates/flex"
import { TextSmall } from "@/components/typography"

export const ItemContainer = styled(Flex).attrs({
  as: "li",
  role: "option",
  padding: [1, 4],
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
  index,
  style,
  ...rest
}) => {
  const selected = selectedValue === value

  const onSelect = event => {
    if (onClick) onClick(event)
    onItemClick(value)
  }

  return (
    <ItemContainer
      data-index={index}
      aria-selected={selected}
      disabled={disabled || selected}
      onClick={onSelect}
      {...restItem}
      {...rest}
      style={style}
    >
      {reverse && <TextSmall>{label}</TextSmall>}
      {icon}
      {!reverse && <TextSmall>{label}</TextSmall>}
    </ItemContainer>
  )
}

export default DropdownItem
