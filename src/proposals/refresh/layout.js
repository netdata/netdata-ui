import React from "react"
import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { Text, TextSmall } from "@/components/typography"
import { getColor, getSizeBy } from "@/theme"

const Column = styled(Flex).attrs({ column: true, gap: 4, flex: "1 1 0" })`
  min-width: ${getSizeBy(50)};
`

const Heading = styled(Flex).attrs({ column: true, gap: 0.5, padding: [0, 0, 2] })`
  border-bottom: 1px solid ${getColor("border")};
`

export const Side = ({ title, note, children }) => (
  <Column>
    <Heading>
      <Text strong>{title}</Text>
      {note ? <TextSmall color="textLite">{note}</TextSmall> : null}
    </Heading>
    {children}
  </Column>
)

export const Compare = ({ today, proposed, todayNote, proposedNote }) => (
  <Flex gap={8} alignItems="start" flexWrap>
    <Side title="Today" note={todayNote}>
      {today}
    </Side>
    <Side title="Proposed" note={proposedNote}>
      {proposed}
    </Side>
  </Flex>
)

export const Section = ({ caption, children }) => (
  <Flex column gap={2}>
    {caption ? <TextSmall color="textLite">{caption}</TextSmall> : null}
    {children}
  </Flex>
)

export const Row = props => <Flex gap={2} alignItems="center" flexWrap {...props} />

export const Stack = props => <Flex column gap={6} {...props} />
