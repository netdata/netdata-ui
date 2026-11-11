import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { Text } from "@/components/typography"
import { getColor, getSizeBy } from "@/theme"

const Surface = styled(Flex).attrs(({ maxWidth = 80 }) => ({
  column: true,
  gap: 0.5,
  margin: [1.5],
  padding: [2, 2.5],
  round: 2,
  border: { side: "all", color: "border" },
  background: "popoverBackground",
  color: "textFocus",
  width: { max: maxWidth },
}))`
  font-size: ${getSizeBy(1.5)};
  line-height: ${getSizeBy(2.25)};
  overflow-wrap: anywhere;
  box-shadow: 0 ${getSizeBy(1)} ${getSizeBy(3)} ${getColor("dropdownShadow")};
`

const Title = styled(Text).attrs({
  color: "textLite",
  fontSize: "11px",
  lineHeight: "16px",
  strong: true,
  textTransform: "uppercase",
})`
  letter-spacing: 0.06em;
`

const TooltipSurface = ({ content, structured, maxWidth }) => (
  <Surface maxWidth={maxWidth}>
    {structured ? (
      <>
        {content.title ? <Title>{content.title}</Title> : null}
        {content.description}
      </>
    ) : (
      content
    )}
  </Surface>
)

export default TooltipSurface
