import styled from "styled-components"
import Flex from "src/components/templates/flex"
import getBackground from "./background"
import getPillColor from "../colors"

const Container = styled(Flex).attrs(({ round = 999, hollow, flavour, borderColor, tiny }) => ({
  padding: !tiny && [1, 2],
  round,
  border: {
    side: "all",
    color: borderColor ? borderColor : getPillColor(hollow ? "border" : "background", flavour),
    size: "1px",
  },
  height: tiny ? "8px" : "20px",
  width: tiny && "8px",
  justifyContent: "center",
  alignItems: "center",
}))`
  ${getBackground};
  cursor: pointer;
`

export default Container
