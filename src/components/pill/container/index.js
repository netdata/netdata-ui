import styled from "styled-components"
import Flex from "src/components/templates/flex"
import getBackground from "./background"
import getPillColor from "../colors"

const getPillWidth = (width, tiny) => {
  if (width) return width
  return tiny && "8px"
}

const getPillHeight = (height, tiny) => {
  if (height) return height
  return tiny ? "8px" : "20px"
}

const Container = styled(Flex).attrs(
  ({ round = 999, hollow, flavour, borderColor, tiny, width, height }) => ({
    padding: !tiny && [1, 2],
    round,
    border: {
      side: "all",
      color: borderColor ? borderColor : getPillColor(hollow ? "border" : "background", flavour),
      size: "1px",
    },
    height: getPillHeight(height, tiny),
    width: getPillWidth(width, tiny),
    justifyContent: "center",
    alignItems: "center",
  })
)`
  ${getBackground};
  cursor: pointer;
`

export default Container
