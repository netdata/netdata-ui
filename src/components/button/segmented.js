import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { getSizeBy } from "@/theme"
import { controlFontSize } from "@/mixins/controlSize"
import { segmentedTrack, segmentedItem } from "@/mixins/segmented"

export const SegmentedTrack = styled(Flex)`
  ${segmentedTrack}
`

// 22px items as in the approved picker (Proposals › Refresh › TabsVariants).
export const SegmentedItem = styled.button.attrs({ type: "button" })`
  all: unset;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${getSizeBy(2.75)};
  padding: 0 ${getSizeBy(1.25)};
  font-family: inherit;
  font-size: ${controlFontSize("default")};
  line-height: ${getSizeBy(2)};
  white-space: nowrap;
  cursor: pointer;
  ${segmentedItem}

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`
