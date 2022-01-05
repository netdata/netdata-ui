import styled from "styled-components"
import Flex from "src/components/templates/flex"
import getPillBackground from "../mixins/background"
import { getPillColor } from "../mixins/colors"
import getPillHeight from "../mixins/height"
import getPillPadding from "../mixins/padding"
import getPillWidth from "../mixins/width"

const Container = styled(Flex).attrs(
  ({ round = 999, hollow, flavour, borderColor, onClick, padding, size, tiny, width, height, position }) => ({
    padding: getPillPadding(padding, size, tiny),
    round,
    border: {
      side: "all",
      color: borderColor || getPillColor(hollow ? "border" : "background", flavour),
      size: "1px",
    },
    cursor: onClick ? "pointer" : "default",
    height: getPillHeight(height, size, tiny),
    width: getPillWidth(width, tiny),
    justifyContent: "center",
    alignItems: "center",
    position,
  })
)`
  ${getPillBackground};
  ${({ marginLeft }) => marginLeft && `margin-left: ${marginLeft};`}
`

export default Container
