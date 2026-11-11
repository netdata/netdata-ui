import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { TextSmall } from "@/components/typography"
import { getRgbColor } from "@/theme"

const Track = styled(Flex)`
  background-color: ${getRgbColor("textLite", 0.06)};
  transition:
    background-color 140ms ease-out,
    border-color 140ms ease-out;

  &[data-selected] {
    background-color: ${getRgbColor("primary", 0.06)};
    border-color: ${getRgbColor("primary", 0.5)};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const Selection = styled(Flex)`
  &:empty {
    position: absolute;
  }
`

const ActionTrack = ({ selectedCount, children }) => (
  <Track
    role="group"
    aria-label="Table actions"
    data-selected={selectedCount > 0 ? "" : undefined}
    alignItems="center"
    flex={false}
    height={{ min: 7 }}
    round={3.5}
    gap={0.25}
    padding={[0.25]}
    border={{ side: "all", color: "borderSecondary" }}
  >
    <Selection role="status" alignItems="center" padding={[0, 0, 0, 2]}>
      {selectedCount > 0 && (
        <>
          <TextSmall color="primary" strong whiteSpace="nowrap">
            {`${selectedCount.toLocaleString()} selected`}
          </TextSmall>
          <Flex
            aria-hidden="true"
            width="1px"
            height={4}
            margin={[0, 1]}
            background="primary"
            backgroundOpacity={0.5}
          />
        </>
      )}
    </Selection>
    {children}
  </Track>
)

export default ActionTrack
