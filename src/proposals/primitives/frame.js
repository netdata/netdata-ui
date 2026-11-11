// Story-only frames for the primitives proposal.
import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { Text, TextSmall } from "@/components/typography"
import { getColor, getSizeBy } from "@/theme"

const SampleFrame = styled(Flex).attrs({ column: true, gap: 1.5 })`
  min-width: 0;
`

// One labelled specimen: name, exact values, then the rendering.
export const Sample = ({ name, values, children }) => (
  <SampleFrame>
    <Flex column gap={0.5}>
      <TextSmall strong>{name}</TextSmall>
      {values ? <TextSmall color="textLite">{values}</TextSmall> : null}
    </Flex>
    {children}
  </SampleFrame>
)

// A card surface (8px radius, hairline border) to show primitives in context.
export const Card = styled(Flex).attrs(props => ({
  column: true,
  padding: [3, 4],
  gap: 3,
  round: "8px",
  border: { side: "all", color: "border" },
  background: "mainBackground",
  ...props,
}))`
  min-width: 0;
`

export const CardTitle = props => <Text strong {...props} />

// Specimen strip with a fixed height so vertical rules have something to stretch against.
export const Strip = styled(Flex).attrs(props => ({
  alignItems: "center",
  gap: 2,
  height: 8,
  padding: [0, 2],
  round: "4px",
  border: { side: "all", color: "borderSecondary" },
  ...props,
}))``

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${getSizeBy(26)}, 1fr));
  gap: ${getSizeBy(3)};
`

export const Note = styled(TextSmall).attrs({ color: "textLite" })`
  max-width: ${getSizeBy(70)};
  border-left: 2px solid ${getColor("border")};
  padding-left: ${getSizeBy(1)};
`
