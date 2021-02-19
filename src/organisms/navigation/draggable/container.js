import styled from "styled-components"
import Flex from "src/components/templates/flex"
import { getColor } from "src/theme"

const Container = styled(Flex).attrs({
  width: "100%",
  height: "100%",
  flex: true,
  basis: "0%",
  position: "relative",
  overflow: { vertical: "hidden", horizontal: "auto" },
})`
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;

  &::-webkit-scrollbar {
    height: 0px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${getColor("selected")};
  }
`

export default Container
