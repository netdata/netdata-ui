import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { Text, TextSmall } from "@/components/typography"
import { getColor } from "@/theme"
import { AlertDropdown, directions } from "./dropdown"

const Comparison = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 288px), 1fr));
  gap: 20px;
  width: min(1200px, calc(100vw - 32px));
  padding: 16px 0;
  max-height: 100dvh;
  overflow-y: auto;
  margin: 0 auto;
`

const Specimen = styled(Flex)`
  width: 100%;
  min-width: 0;
`

const Standalone = styled.div`
  width: min(390px, calc(100vw - 32px));
`

const Letter = styled(TextSmall)`
  display: grid;
  place-items: center;
  flex: 0 0 24px;
  height: 24px;
  border-radius: 6px;
  background: ${getColor("menuItemSelected")};
  color: ${getColor("menuItemSelectedText")};
`

const DropdownSpecimen = ({ direction }) => {
  const { letter, title, summary } = directions[direction]

  return (
    <Specimen column gap={3} data-dropdown-specimen={direction}>
      <Flex column gap={1.5}>
        <Flex alignItems="center" gap={2}>
          <Letter strong>{letter}</Letter>
          <Text as="h1" strong margin={0}>
            {title}
          </Text>
        </Flex>
        <TextSmall color="textLite">{summary}</TextSmall>
      </Flex>
      <AlertDropdown direction={direction} />
    </Specimen>
  )
}

export default {
  title: "Proposals/Searchable dropdowns",
  parameters: { layout: "fullscreen" },
}

export const Compare = () => (
  <Comparison>
    {Object.keys(directions).map(direction => (
      <DropdownSpecimen key={direction} direction={direction} />
    ))}
  </Comparison>
)

const SingleDirection = ({ direction }) => (
  <Standalone>
    <DropdownSpecimen direction={direction} />
  </Standalone>
)

export const InsetList = () => <SingleDirection direction="inset" />
export const StatusSections = () => <SingleDirection direction="sections" />
export const CommandMenu = () => <SingleDirection direction="command" />
