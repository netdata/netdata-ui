import styled from "styled-components"
import { Icon } from "@/components/icon"
import { ModalBody, ModalContent, ModalFooter, ModalHeader } from "@/components/modal"
import { H4, Text } from "@/components/typography"

export const Actions = styled(ModalFooter).attrs({
  gap: 2,
  hasBorder: false,
  margin: [2, 0, 0],
  parentPadding: [0],
  padding: [0],
})``

// Radius, border and the modal shadow come from ModalContent, so the shadow follows the rounded card.
export const Content = styled(Text).attrs({
  as: ModalContent,
  background: "dropdown",
  gap: 3,
  height: { max: "calc(100vh - 32px)" },
  padding: [4, 5],
  width: { base: 128, max: 140, min: 70 },
})``

export const Body = styled(ModalBody).attrs({
  column: false,
  padding: [0],
})`
  display: block;

  strong {
    font-weight: bold;
  }
`

// Right padding keeps long titles clear of the absolutely positioned close button.
export const Header = styled(ModalHeader).attrs({
  alignItems: "center",
  padding: [0, 7, 0, 0],
  background: "",
})``

// H4 is the matching scale step; render it as h3 to keep the document outline unchanged.
export const Title = styled(H4).attrs({
  as: "h3",
  color: "main",
  margin: [0],
})``

export const TitleIcon = styled(Icon).attrs(({ color = "main" }) => ({
  color,
  height: "20px",
  width: "20px",
}))``
