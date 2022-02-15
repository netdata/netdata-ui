import styled from "styled-components"

export const StyledTable = styled.table`
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  position: ${({ hasStickyHeader }) => hasStickyHeader && "relative"};
`

export const BlockLayout = styled.div`
  display: inline-block;
  border-spacing: 0;
`
