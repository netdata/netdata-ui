import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { getColor } from "@/theme"

const StyledTab = styled(Flex).attrs(({ active }) => ({
  gap: 1,
  background: active ? "mainBackground" : "topBarBg",
  padding: [2, 3],
  round: { side: "top" },
  border: { side: "all", color: "border" },
  alignItems: "center",
  justifyContent: "start",
  position: "relative",
  zIndex: active ? 2 : 0,
}))`
  top: ${({ active }) => !active && "2px"};
  border-bottom-color: ${({ active }) => active && getColor("mainBackground")};
  cursor: pointer;
`

export default StyledTab
