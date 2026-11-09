import React from "react"
import { LayerProps } from "../templates/layer"
import { FlexProps } from "../templates/flex"
import { PaddingProps } from "../../mixins/types"

type ModalSurfaceProps = FlexProps &
  Omit<React.ComponentPropsWithRef<"div">, keyof FlexProps> & { testId?: string }

export type ModalContentProps = ModalSurfaceProps & {
  appearance?: "dialog"
}

export type ModalHeaderProps = ModalSurfaceProps

export type ModalBodyProps = ModalSurfaceProps

export type ModalFooterProps = ModalSurfaceProps & {
  hasBorder?: boolean
  parentPadding?: PaddingProps["padding"]
  containerProps?: FlexProps
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

declare const Modal: React.FC<LayerProps & { appearance?: "dialog" }>
declare const ModalContent: React.FC<ModalContentProps>
declare const ModalHeader: React.FC<ModalHeaderProps>
declare const ModalBody: React.FC<ModalBodyProps>
declare const ModalFooter: React.FC<ModalFooterProps>
declare const ModalButton: (props: ModalButtonProps) => React.ReactElement
declare const ModalCloseButton: (props: ModalCloseButtonProps) => React.ReactElement

export { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalButton, ModalCloseButton }

export default Modal
