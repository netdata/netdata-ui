import styled from "styled-components"
import Flex from "src/components/templates/flex"
import { getColor } from "src/theme"

const StyledTab = styled(Flex).attrs(({ active }) => ({
  gap: 1,
  background: active ? "mainBackground" : "elementBackground",
  padding: [2, 3],
  round: { side: "top" },
  border: active && { side: "all", color: "selected" },
  alignItems: "center",
  justifyContent: "start",
  overflow: "hidden",
  width: { max: 120 },
  position: "relative",
  elevation: active ? "2" : "0",
}))`
  top: 1px;
  border-bottom-color: ${({ active }) => active && getColor("mainBackground")};
  cursor: pointer;
  translate: scale(${({ active }) => (active ? 1 : 0.8)});
`

export default StyledTab
