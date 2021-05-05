import styled from "styled-components"
import Flex from "src/components/templates/flex"
import { getColor } from "src/theme"

const getBackground = ({ theme, background, flavour = "neutral", hollow }) => {
  if (background) return
  const type = hollow ? "hollow" : "background"
  const value = getColor(["pill", type, flavour])({ theme })
  return `background-color: ${value};`
}

const Container = styled(Flex).attrs(({ round = 999, hollow, flavour, borderColor }) => ({
  padding: [1, 2],
  round,
  border: {
    side: "all",
    color: borderColor ? borderColor : ["pill", hollow ? "border" : "background", flavour],
    size: "1px",
  },
  height: "20px",
  justifyContent: 'center',
  alignItems: 'center'
}))`
  ${getBackground};
  cursor: pointer;
`

export default Container
