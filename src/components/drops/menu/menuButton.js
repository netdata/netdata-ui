import React from "react"
import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { Icon } from "@/components/icon"
import { Text } from "@/components/typography"

const MenuContainer = styled(Flex)`
  cursor: pointer;
`

const MenuButton = ({ open, icon, label, caret, ref, ...rest }) => (
  <MenuContainer
    gap={2}
    padding={[2, 4]}
    justifyContent="between"
    alignItems="center"
    role="button"
    tabindex="0"
    aria-haspopup="listbox"
    aria-expanded={open}
    ref={ref}
    {...rest}
  >
    <Flex alignItems="center" gap={2}>
      {icon}
      {typeof label === "string" ? <Text>{label}</Text> : label}
    </Flex>
    {caret === true ? (
      <Icon name="chevron_down" color="text" width="12px" height="12px" rotate={open ? 2 : null} />
    ) : (
      caret
    )}
  </MenuContainer>
)

export default MenuButton
