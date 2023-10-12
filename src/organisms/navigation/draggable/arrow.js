import React from "react"
import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { Icon } from "@/components/icon/icon"

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
