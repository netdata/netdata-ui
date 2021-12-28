import styled from "styled-components"
import Flex from "src/components/templates/flex"
import getPillBackground from "../mixins/background"
import { getPillColor } from "../mixins/colors"
import getPillHeight from "../mixins/height"
import getPillPadding from "../mixins/padding"
import getPillWidth from "../mixins/width"

const Container = styled(Flex).attrs(
  ({ round = 999, hollow, flavour, borderColor, padding, size, tiny, width, height }) => ({
    padding: getPillPadding(padding, size, tiny),
    round,
    border: {
      side: "all",
      color: borderColor || getPillColor(hollow ? "border" : "background", flavour),
      size: "1px",
    },
    height: getPillHeight(height, size, tiny),
    width: getPillWidth(width, tiny),
    justifyContent: "center",
    alignItems: "center",
  })
)`
  ${getPillBackground};
  cursor: pointer;
  ${({ marginLeft }) => marginLeft && `margin-left: ${marginLeft};`}
  ${({ position }) => position && `position: ${position};`}
`

export default Container
