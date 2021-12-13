import styled from "styled-components";
import Flex from "src/components/templates/flex";
import getPillBackground from "src/components/pill/mixins/background";
import getPillHeight from "src/components/pill/mixins/height";

const MasterCard = styled(Flex).attrs(
  ({ height, round = 999, size }) => ({
    height: getPillHeight(height, size),
    round,
  })
)`
  ${getPillBackground};
`

export default { MasterCard }
