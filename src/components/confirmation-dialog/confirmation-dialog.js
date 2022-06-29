import React from "react"

import Modal, {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "src/components/modal"
import Flex from "src/components/templates/flex"
import { Button } from "src/components/button"

const actionButtonStyles = {
  default: {
    confirm: { flavour: "defalut" },
    decline: { flavour: "hollow", danger: true },
  },
  reverse: {
    decline: { flavour: "default" },
    confirm: { flavour: "hollow", danger: true },
  },
}

const flexProperties = {
  default: {
    justifyContent: "end",
  },
  reverse: {
    rowReverse: true,
    justifyContent: "start",
  },
}

const ConfirmationDialog = ({
  title,
  message,
  confirmLabel,
  declineLabel,
  handleConfirm,
  handleDecline,
  actionButtonDirection = "default",
}) => {
  const { confirm: confirmStyles, decline: declineStyles } = actionButtonStyles[
    actionButtonDirection
  ]
  const flexProps = flexProperties[actionButtonDirection]

  return (
    <Modal>
      <ModalContent>
        <ModalHeader>
          {title}
          <ModalCloseButton onClose={handleDecline} />
        </ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ModalFooter hasBorder={false}>
          <Flex gap={4} width="100%" {...flexProps}>
            <Button {...confirmStyles} label={confirmLabel} onClick={handleConfirm} />
            <Button {...declineStyles} label={declineLabel} onClick={handleDecline} />
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmationDialog
