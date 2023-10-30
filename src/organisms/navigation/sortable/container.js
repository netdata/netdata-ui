import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { getColor } from "@/theme"

const Container = styled(Flex).attrs({
  width: "100%",
  height: "100%",
  flex: true,
  basis: "0%",
  position: "relative",
  overflow: { vertical: "hidden", horizontal: "auto" },
  alignItems: "center",
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
