import React from "react"
import { H4, Text, TextSmall } from "@/components/typography"
import Flex from "."

const FlexCard = () => (
  <Flex
    height="260px"
    width={{ max: "220px" }}
    background="disabled"
    padding={[4]}
    margin={[0, 0, 4, 0]}
    gap={4}
    round
    column
  >
    <Flex basis="50%" background="placeholder" />
    <H4 as="span">This is a card title</H4>
    <Text>This is a card description that contains useful information</Text>
    <TextSmall>April, 1997</TextSmall>
  </Flex>
)

export const Card = {
  component: () => (
    <Flex gap={4} flexWrap>
      {[...Array(6)].map((value, index) => (
        <FlexCard key={index.toString()} />
      ))}
    </Flex>
  ),
}

export const List = {
  component: () => (
    <Flex column gap={1} width={{ min: "400px" }}>
      <Flex background="textFocus" padding={[1, 2]}>
        First box
      </Flex>
      <Flex background="separator" padding={[1, 2]}>
        Second box
      </Flex>
      <Flex background="placeholder" padding={[1, 2]}>
        Third box
      </Flex>
    </Flex>
  ),
}

export const Header = {
  component: () => (
    <Flex
      as="header"
      justifyContent="between"
      background="disabled"
      padding={[4]}
      margin={[0, 0, 4, 0]}
      width={{ min: "500px" }}
    >
      <H4 as="span">Netdata</H4>
      <Text>Options</Text>
    </Flex>
  ),
}

export default {
  component: Flex,
}
