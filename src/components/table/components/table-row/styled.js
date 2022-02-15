import styled from "styled-components"

export const StyledRow = styled.tr`
  position: ${({ hasStickyHeader }) => (hasStickyHeader ? "static" : "relative")};
`

export const StyledBlockRow = styled.div`
  position: relative;
`
