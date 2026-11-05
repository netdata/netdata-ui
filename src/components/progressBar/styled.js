import styled from "styled-components"
import { getColor } from "@/theme"
import Box from "@/components/templates/box"
import Flex from "@/components/templates/flex"

// A track-colored seam keeps adjacent segments distinct without changing their widths.
export const Track = styled(Flex)`
  overflow: hidden;

  & > *:not(:last-child) {
    box-shadow: inset -1px 0 0 ${({ background, theme }) => getColor(background)({ theme })};
  }
`

export const Segment = styled(Box)`
  transition: width 160ms ease-out;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`
