import styled from "styled-components"

export const StyledRow = styled.tr`
  cursor: ${({ onClick }) => (onClick ? "pointer" : "auto")};
  position: ${({ hasStickyHeader }) => (hasStickyHeader ? "static" : "relative")};
`

export const StyledBlockRow = styled.div`
  position: relative;
`
