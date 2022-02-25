import React from "react"
import Layer from "../templates/layer"
import Box from "../templates/box"
import Flex from "../templates/flex"
import { Icon } from "../icon"

export const ModalContent = ({ children, height, width, testId }) => {
  return (
    <Flex
      data-testid={testId}
      height={height}
      width={width}
      background={"mainBackground"}
      round
      column
    >
      {children}
    </Flex>
  )
}

export const ModalHeader = ({ children, testId }) => {
  return (
    <Flex data-testid={testId} padding={[6]}>
      {children}
    </Flex>
  )
}

export const ModalBody = ({ children, testId }) => {
  return (
    <Flex data-testid={testId} padding={[0, 6]} column>
      {children}
    </Flex>
  )
}

export const ModalFooter = ({ children, testId }) => (
  <Flex column padding={[0, 6]} flex={1}>
    <Flex
      data-testid={testId}
      flex={1}
      padding={[6, 0]}
      alignItems="center"
      justifyContent="end"
      border={{ size: "1px", type: "solid", side: "top", color: "borderSecondary" }}
    >
      {children}
    </Flex>
  </Flex>
)

export const ModalCloseButton = ({ onClose, testId }) => (
  <Box
    data-testid={testId}
    sx={{ marginLeft: "auto" }}
    as={Icon}
    name="x"
    color="border"
    onClick={onClose}
    cursor="pointer"
  />
)

const Modal = ({ children }) => {
  return <Layer>{children}</Layer>
}

export default Modal
