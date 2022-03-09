import styled from "styled-components"
import Flex from "src/components/templates/flex"
import getPillHeight from "src/components/pill/mixins/height";

export const AlertsContainer = styled(Flex).attrs(
  ({ background, height, onClick, round = 999, size }) => ({
    background,
    ...(onClick && { cursor: "pointer" }),
    height: getPillHeight(height, size),
    round,
    size,
  })
)``

export const MasterCardContainer = styled(Flex).attrs(
  ({ background, height, isAlert, onClick, round = 999, size }) => ({
    background,
    ...(onClick && { cursor: "pointer" }),
    height: getPillHeight(height, size),
    margin: isAlert && [0, 0, 0, -1],
    round,
    size,
  })
)`
  > * {
    ${({ onClick }) => (onClick && "cursor: pointer;")}
  }
`
