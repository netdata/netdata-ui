import styled from "styled-components"
import Flex from "src/components/templates/flex"
import getPillBackground from "./mixins/background"
import { getPillColor } from "./mixins/colors"
import getPillHeight from "./mixins/height"
import getPillPadding from "./mixins/padding"
import getPillWidth from "./mixins/width"

export const AlertsContainer = styled(Flex).attrs(
  ({ background, height, onClick, round = 999, size }) => ({
    background,
    ...(onClick && { cursor: "pointer" }),
    height: getPillHeight(height, size),
    round,
    size,
  })
)``

export const MasterCardContainer = styled(Flex).attrs(
  ({ background, height, isAlert, onClick, round = 999, size }) => ({
    background,
    ...(onClick && { cursor: "pointer" }),
    height: getPillHeight(height, size),
    margin: isAlert && [0, 0, 0, -1],
    round,
    size,
  })
)`
  > * {
    ${({ onClick }) => (onClick && "cursor: pointer;")}
  }
`

export const PillContainer = styled(Flex).attrs(
  ({ round = 999, hollow, flavour, borderColor, onClick, padding, size, tiny, width, height, position }) => ({
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
      justifyContent: "center",
      alignItems: "center",
      position,
  })
)`
  ${getPillBackground};
`
