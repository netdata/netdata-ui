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

const ConfirmationDialog = ({
  title,
  message,
  confirmLabel,
  declineLabel,
  handleConfirm,
  handleDecline,
}) => {
  return (
    <Modal>
      <ModalContent>
        <ModalHeader>
          {title}
          <ModalCloseButton onClose={handleDecline} />
        </ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ModalFooter hasBorder={false}>
          <Flex gap={4} width="100%" justifyContent="end">
            <Button label={confirmLabel} onClick={handleConfirm} />
            <Button danger flavour="hollow" label={declineLabel} onClick={handleDecline} />
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmationDialog
