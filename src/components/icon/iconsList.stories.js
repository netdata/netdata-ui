import React from "react"
import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { Text, TextBigger } from "@/components/typography"
import { getColor } from "../../theme"
import { iconsList } from "./iconsList"
import { Icon } from "."

const iconsExposed = Object.keys(iconsList)

const copyName = name => {
  try {
    navigator.clipboard.writeText(name)
  } catch {
    // Clipboard is unavailable in some embeds; the name stays visible.
  }
}

const Item = styled(Flex)`
  &:hover {
    background: ${getColor("mainBackgroundDisabled")};
  }
`

export const Svgs = () => {
  return (
    <Flex column padding={[10, 4, 2]} gap={4}>
      <TextBigger>Click an icon to copy its name</TextBigger>
      <Flex flexWrap>
        {iconsExposed.map(name => (
          <Item
            onClick={() => copyName(name)}
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
  title: "Components/Icon/IconsList",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Every icon name that Icon accepts, rendered at its default size. Click an icon to copy its name.",
      },
    },
  },
  argTypes: {
    name: {
      description: "Icon name, a key of iconsList.",
      control: false,
      table: { type: { summary: "string" } },
    },
  },
}
