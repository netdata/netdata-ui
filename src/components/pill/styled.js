import styled from "styled-components"
import Flex from "src/components/templates/flex"
import getPillHeight from "src/components/pill/mixins/height";

export const MasterCardContainer = styled(Flex).attrs(
  ({ background, height, onClick, round = 999, size }) => ({
    background,
    height: getPillHeight(height, size),
    cursor: onClick ? "pointer" : "default",
    round,
    size,
  })
)`
  > * {
    ${({ onClick }) => (onClick && "cursor: pointer;")}
  }
`
