import styled from "styled-components"
import Flex from "@/components/templates/flex"
import getPillBackground from "./mixins/background"
import { getPillColor } from "./mixins/colors"
import getPillPadding from "./mixins/padding"

export const MasterCardContainer = styled(Flex).attrs(
  ({ background, height, onClick, round = 999, size }) => ({
    background,
    ...(onClick && { cursor: "pointer" }),
    position: "relative",
    round,
    size,
  })
)`
  * {
    cursor: ${({ onClick }) => (onClick ? "pointer" : "inherit")};
  }
`

export const PillContainer = styled(Flex).attrs(
  ({
    round = true,
    hollow,
    flavour,
    borderColor,
    onClick,
    padding,
    size,
    tiny,
    position,
    zIndex,
    justifyContent = "center",
    alignItems = "center",
    background,
    semi,
    ...rest
  }) => ({
    padding: getPillPadding(padding, size, tiny),
    round: round === false ? 1 : round === true ? 7.5 : round,
    border: {
      side: "all",
      color: borderColor || getPillColor(semi ? "hollow" : "border", flavour),
      size: "1px",
    },
    ...(onClick && { cursor: "pointer" }),
    justifyContent,
    alignItems,
    position,
    zIndex,
    background: getPillBackground({ background, flavour, hollow, semi }),
    ...rest,
  })
)``
