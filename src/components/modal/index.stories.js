import React from "react"
import Modal, { ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from "."
import Flex from "@/components/templates/flex"
import { Button } from "@/components/button"

export const Basic = () => {
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
}

export const ModalWithoutBackdrop = () => {
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
}

export default {
  component: Modal,
  args: {
    error: "",
    disabled: false,
    iconLeft: "",
    iconRight: "",
    name: "",
    className: "",
    hint: "Do this and that",
    fieldIndicator: 180,
    placeholder: "Placeholder text",
    label: "My label",
    value: "",
    size: "small",
    containerStyles: {},
    inputContainerStyles: {},
  },
  argTypes: {
    error: { control: "text" },
    disabled: { control: "boolean" },
    iconLeft: {
      options: ["", "L"],
      control: { type: "radio" },
    },
    iconRight: {
      options: ["", "R"],
      control: { type: "radio" },
    },
    name: { control: "text" },
    className: { control: "text" },
    hint: { control: "text" },
    fieldIndicator: 180,
    placeholder: { control: "text" },
    label: { control: "text" },
    value: { control: "text" },
    size: {
      options: ["tiny", "small"],
      control: { type: "radio" },
    },
  },
}
