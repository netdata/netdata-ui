import styled from "styled-components"
import Flex from "@/components/templates/flex"

const Image = styled(Flex).attrs({ as: "img" })`
  object-fit: cover;
`

export default Image
