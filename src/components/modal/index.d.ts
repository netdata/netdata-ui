import React from "react"

export type ModalContentProps = {
  height: number | string
  width: number | string
  testId: string
}

export type ModalHeaderProps = {
  testId: string
}

export type ModalBodyProps = {
  testId: string
}

export type ModalFooterProps = {
  testId: string
}

export type ModalCloseButtonProps = {
  onClose: () => void
  testId: string
}

declare const Modal: React.FC
declare const ModalContent: React.FC<ModalContentProps>
declare const ModalHeader: React.FC<ModalHeaderProps>
declare const ModalBody: React.FC<ModalBodyProps>
declare const ModalFooter: React.FC<ModalFooterProps>
declare const ModalCloseButton: (props: ModalCloseButtonProps) => React.ReactElement

export { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton }

export default Modal
