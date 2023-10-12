import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { webkitVisibleScrollbar } from "@/mixins"

const Container = styled(Flex).attrs({
  overflow: { vertical: "auto" },
  padding: [0, 4, 0, 0],
})`
  ${webkitVisibleScrollbar}
`

export default Container
