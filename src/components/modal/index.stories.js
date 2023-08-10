import React from "react"
import Modal, { ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from "."
import Flex from "../templates/flex"
import { Button } from "../button"

export const Base = {
  component: () => {
    return (
      <Modal>
        <ModalContent>
          <ModalHeader>
            Header
            <ModalCloseButton testId="close-button" />
          </ModalHeader>
          <ModalBody>
            <Flex height={60} width={80}>
              Here is body
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button label="Footer button" />
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  },
}

export const ModalWithoutBackdrop = {
  component: () => {
    return (
      <Modal backdrop={false}>
        <ModalContent background="selected">
          <ModalHeader>
            Header
            <ModalCloseButton testId="close-button" />
          </ModalHeader>
          <ModalBody>
            <Flex height={60} width={80}>
              Here is body
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button label="Footer button" />
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  },
}

export default {
  component: Modal,
}
