import React from "react"
import styled from "styled-components"
import Flex from "src/components/templates/flex"
import { Icon } from "src/components/icon/icon"

const IconWrapper = styled(Flex).attrs({
  padding: [2],
})`
  cursor: pointer;
`

export default ({ onClick, name }) => (
  <IconWrapper onClick={onClick}>
    <Icon name={name} color="text" width={8} height={8} />
  </IconWrapper>
)
