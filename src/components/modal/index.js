import React from "react"
import Layer from "@/components/templates/layer"
import Flex from "@/components/templates/flex"
import { IconButton } from "@/components/button"

const TOP_BOTTOM_PADDING = 2
const LEFT_RIGHT_PADDING = 4

export const ModalContent = ({ background = "mainBackground", children, testId, ...rest }) => (
  <Flex background={background} column data-testid={testId} round {...rest}>
    {children}
  </Flex>
)

export const ModalHeader = ({ children, testId, ...rest }) => (
  <Flex
    background="modalHeaderBackground"
    data-testid={testId}
    padding={[TOP_BOTTOM_PADDING, LEFT_RIGHT_PADDING]}
    {...rest}
  >
    {children}
  </Flex>
)

export const ModalBody = ({ children, testId, ...rest }) => (
  <Flex data-testid={testId} padding={[TOP_BOTTOM_PADDING, LEFT_RIGHT_PADDING]} column {...rest}>
    {children}
  </Flex>
)

export const ModalFooter = ({ children, hasBorder = true, parentPadding, testId, ...rest }) => (
  <Flex column padding={parentPadding || [0, LEFT_RIGHT_PADDING]} flex={1}>
    <Flex
      data-testid={testId}
      flex={1}
      padding={[TOP_BOTTOM_PADDING, 0]}
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

export const ModalButton = ({ iconName, onClick, testId, ...rest }) => (
  <IconButton
    data-testid={testId}
    icon={iconName}
    neutral
    onClick={onClick}
    cursor="pointer"
    flavour="borderless"
    {...rest}
  />
)

export const ModalCloseButton = ({ onClose, testId, ...rest }) => (
  <ModalButton
    iconName="x"
    onClick={onClose}
    testId={testId}
    position="absolute"
    height="14px"
    width="14px"
    top={2}
    right={2}
    {...rest}
  />
)

const Modal = ({ children, ...rest }) => <Layer {...rest}>{children}</Layer>

export default Modal
