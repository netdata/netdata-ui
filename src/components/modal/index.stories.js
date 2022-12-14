import React from "react"
import { storiesOf } from "@storybook/react"

import Modal, { ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from "./index"
import Flex from "../templates/flex"
import { Button } from "../button"

const modalStory = storiesOf("Utils/Modal")

modalStory.add("Modal", () => {
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
})

modalStory.add("Modal without backdrop", () => {
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
})
