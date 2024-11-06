import styled from "styled-components"
import { Icon } from "@/components/icon"
import Modal, { ModalBody, ModalContent, ModalFooter, ModalHeader } from "@/components/modal"
import { H3, Text } from "@/components/typography"

export const Actions = styled(ModalFooter).attrs({
  gap: 3,
  hasBorder: false,
  parentPadding: [0],
  padding: [0],
})``

export const Content = styled(Text).attrs({
  as: ModalContent,
  background: "dropdown",
  gap: 4,
  height: { max: "calc(100vh - 32px)" },
  padding: [4],
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

export const Dialog = styled(Modal).attrs(props => ({
  backdropProps: { backdropBlur: 8 },
  ...props,
}))`
  box-shadow:
    0 11px 15px -7px rgb(0 0 0 / 20%),
    0px 24px 38px 3px rgb(0 0 0 / 14%),
    0px 9px 46px 8px rgb(0 0 0 / 12%);
`

export const Header = styled(ModalHeader).attrs({
  alignItems: "center",
  padding: [0],
  background: "",
})``

export const Title = styled(H3).attrs({
  margin: [0],
})``

export const TitleIcon = styled(Icon).attrs({
  color: "main",
  height: "24px",
  width: "24px",
})``
