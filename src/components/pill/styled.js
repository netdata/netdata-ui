import styled from "styled-components"
import Flex from "src/components/templates/flex"
import getPillBackground from "./mixins/background"
import { getPillColor } from "./mixins/colors"
import getPillHeight from "./mixins/height"
import getPillPadding from "./mixins/padding"
import getPillWidth from "./mixins/width"

export const MasterCardContainer = styled(Flex).attrs(
  ({ background, height, onClick, round = 999, size }) => ({
    background,
    ...(onClick && { cursor: "pointer" }),
    position: "relative",
    round,
    size,
    border: { side: "all", color: "border" },
  })
)`
  * {
    cursor: ${({ onClick }) => (onClick ? "pointer" : "inherit")};
  }
`

export const PillContainer = styled(Flex).attrs(
  ({
    round = 999,
    hollow,
    flavour,
    borderColor,
    onClick,
    padding,
    size,
    tiny,
    width,
    height,
    position,
    zIndex,
    justifyContent = "center",
    alignItems = "center",
  }) => ({
    padding: getPillPadding(padding, size, tiny),
    round,
    border: {
      side: "all",
      color: borderColor || getPillColor(hollow ? "border" : "background", flavour),
      size: "1px",
    },
    ...(onClick && { cursor: "pointer" }),
    height: getPillHeight(height, size, tiny),
    width: getPillWidth(width, tiny),
    justifyContent,
    alignItems,
    position,
    zIndex,
  })
)`
  ${getPillBackground};
`
