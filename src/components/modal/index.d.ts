import React from "react"
import { LayerProps } from "../templates/layer"
import appColors from "../../theme/default/colors"
import rawColors from "../../theme/rawColors"

export type ModalContentProps = {
  height?: number | string
  width?: number | string
  testId?: string
  background?: Exclude<keyof typeof appColors, keyof typeof rawColors>
}

export type ModalHeaderProps = {
  testId?: string
}

export type ModalBodyProps = {
  testId?: string
}

export type ModalFooterProps = {
  testId?: string
  hasBorder?: boolean
}

export type ModalButtonProps = {
  iconName: string
  onClick: () => void
  testId?: string
}

export type ModalCloseButtonProps = {
  onClose: () => void
  testId?: string
}

declare const Modal: React.FC<LayerProps>
declare const ModalContent: React.FC<ModalContentProps>
declare const ModalHeader: React.FC<ModalHeaderProps>
declare const ModalBody: React.FC<ModalBodyProps>
declare const ModalFooter: React.FC<ModalFooterProps>
declare const ModalButton: (props: ModalButtonProps) => React.ReactElement
declare const ModalCloseButton: (props: ModalCloseButtonProps) => React.ReactElement

export { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalButton, ModalCloseButton }

export default Modal
