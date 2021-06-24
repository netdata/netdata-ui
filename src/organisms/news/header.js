import React from "react"
import Flex from "src/components/templates/flex"
import { Icon } from "src/components/icon"
import { TextBig } from "src/components/typography"
import { Button } from "src/components/button"

const Header = ({ onClose }) => {
  return (
    <Flex
      border={{ side: "bottom", color: "selected" }}
      justifyContent="between"
      alignItems="center"
      padding={[0, 0, 4, 0]}
    >
      <Flex gap={2}>
        <Icon color="text" name="insights" />
        <TextBig strong>Netdata News</TextBig>
      </Flex>
      <Button flavour="borderless" neutral icon="x" title="close news" onClick={onClose} />
    </Flex>
  )
}

export default Header
