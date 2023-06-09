import React from "react"
import Layer from "../templates/layer"
import Box from "../templates/box"
import Flex from "../templates/flex"
import { Icon } from "../icon"

export const ModalContent = ({ background = "mainBackground", children, testId, ...rest }) => (
  <Flex background={background} column data-testid={testId} round {...rest}>
    {children}
  </Flex>
)

export const ModalHeader = ({ children, testId, ...rest }) => (
  <Flex data-testid={testId} padding={[6]} {...rest}>
    {children}
  </Flex>
)

export const ModalBody = ({ children, testId, ...rest }) => (
  <Flex data-testid={testId} padding={[0, 6]} column {...rest}>
    {children}
  </Flex>
)

export const ModalFooter = ({ children, hasBorder = true, parentPadding, testId, ...rest }) => (
  <Flex column padding={parentPadding || [0, 6]} flex={1}>
    <Flex
      data-testid={testId}
      flex={1}
      padding={[6, 0]}
      alignItems="center"
      justifyContent="end"
      border={
        hasBorder ? { size: "1px", type: "solid", side: "top", color: "borderSecondary" } : {}
      }
      {...rest}
    >
      {children}
    </Flex>
  </Flex>
)

export const ModalCloseButton = ({ onClose, testId, ...rest }) => (
  <Box
    data-testid={testId}
    sx={{ marginLeft: "auto" }}
    as={Icon}
    name="x"
    color="border"
    onClick={onClose}
    cursor="pointer"
    {...rest}
  />
)

export const ModalMinimizeButton = ({ onClick, testId, ...rest }) => (
  <Box
    data-testid={testId}
    sx={{ marginLeft: "auto" }}
    as={Icon}
    name="minimize_s"
    color="border"
    onClick={onClick}
    cursor="pointer"
    {...rest}
  />
)

const Modal = ({ children, ...rest }) => <Layer {...rest}>{children}</Layer>

export default Modal
