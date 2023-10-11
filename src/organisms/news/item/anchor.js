import styled from "styled-components"
import Flex from "@/components/templates/flex"

const Anchor = styled(Flex).attrs({ as: "a" })`
  text-decoration: none;
  & :hover {
    text-decoration: none;
  }
`
export default Anchor
