import React from "react"
import styled from "styled-components"
import Flex from "src/components/templates/flex"

const Container = styled(Flex)`
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12);
  list-style-type: none;
`

const Dropdown = ({ value, onItemClick, items, itemProps, renderItem }) => (
  <Container
    as="ul"
    role="listbox"
    background="dropdown"
    padding={[0]}
    margin={[1, 0]}
    column
    tabindex="-1"
  >
    {items.map(item => renderItem({ item, itemProps, value, onItemClick }))}
  </Container>
)

export default Dropdown
