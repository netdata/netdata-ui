import styled from "styled-components"

export const StyledTable = styled.table`
  width: 100%;
  height: 100%;
  border-collapse: ${({ hasStickyHeader }) => (hasStickyHeader ? "separate" : "collapse")};
  position: ${({ hasStickyHeader }) => hasStickyHeader && "relative"};
`

export const BlockLayout = styled.div`
  display: ${({ hideHeader }) => (hideHeader ? "block" : "inline-block")};
  border-spacing: 0;
`
