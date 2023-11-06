import React from "react"
import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { Icon } from "@/components/icon/icon"

const IconWrapper = styled(Flex).attrs(props => ({
  height: "100%",
  alignItems: "center",
  padding: [2],
  background: "topBarBg",
  position: "absolute",
  cursor: "pointer",
  sx: props.right ? { right: 0 } : { left: 0 },
  zIndex: 3,
  ...props,
}))``

export default ({ onClick, name, right }) => (
  <IconWrapper onClick={onClick} right={right}>
    <Icon name={name} color="text" width={8} height={8} />
  </IconWrapper>
)
