import React from "react"
import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { Icon } from "@/components/icon"

const sortingIcons = {
  asc: "sort_ascending",
  desc: "sort_descending",
  indicator: "sort_indicator",
}

// Needed to be targeted by parent on hover
export const SortIconContainer = styled(Flex).attrs(props => ({
  flex: 0,
  ...props,
}))`
  transition: opacity 200ms ease;
  opacity: ${({ sorting }) => (sorting ? 1 : 0)};
  position: absolute;
`

const Sorting = ({ sortable, sorting, ...rest }) => {
  if (!sortable) return null

  return (
    <SortIconContainer sorting={sorting}>
      <Icon
        height="12px"
        width="12px"
        color={sorting ? "text" : "textLite"}
        name={sortingIcons[sorting ? sorting : "indicator"] ?? null}
        {...rest}
      />
    </SortIconContainer>
  )
}

export default Sorting
