import React from "react"
import styled from "styled-components"
import { Icon } from "src/components/icon"

const sortingIcons = {
  asc: "sort_ascending",
  desc: "sort_descending",
  indicator: "sort_indicator",
}

// Needed to be targeted by parent on hover
export const SortIconContainer = styled.div`
  visibility: ${({ sorting }) => (sorting ? "visible" : "hidden")};
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
