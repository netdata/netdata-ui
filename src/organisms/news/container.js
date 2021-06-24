import styled from "styled-components"
import Flex from "src/components/templates/flex"
import { webkitVisibleScrollbar } from "src/mixins"

const Container = styled(Flex).attrs({
  overflow: { vertical: "auto" },
  padding: [0, 4, 0, 0],
})`
  ${webkitVisibleScrollbar}
`

export default Container
