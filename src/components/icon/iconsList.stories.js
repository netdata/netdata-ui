import React from "react"
import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { Text, TextBigger } from "@/components/typography"
import { getColor } from "../../theme"
import { iconsList } from "./iconsList"
import { Icon } from "."

const iconsExposed = Object.keys(iconsList)

const Item = styled(Flex)`
  &:hover {
    background: ${getColor("mainBackgroundDisabled")};
  }
`

export const Svgs = () => {
  return (
    <Flex column padding={[10, 4, 2]} gap={4}>
      <TextBigger>Click item to copy icon name</TextBigger>
      <Flex flexWrap>
        {iconsExposed.map(name => (
          <Item
            onClick={() => alert(name)}
            cursor="pointer"
            key={name}
            padding={[3, 3]}
            flex="grow"
            basis="33%"
            justifyContent="start"
            gap={2}
          >
            <Icon name={name} />
            <Text>{name}</Text>
          </Item>
        ))}
      </Flex>
    </Flex>
  )
}

export default {
  component: Icon,
}
