import styled, { useTheme } from "styled-components"
import Layer from "@/components/templates/layer"
import Flex from "@/components/templates/flex"
import { IconButton } from "@/components/button"
import {
  dialogShadow,
  isDarkTheme,
  modalShadow,
} from "@/components/templates/layer/mixins/elevation"
import { getSizeBy } from "@/theme/utils"

const TOP_BOTTOM_PADDING = 3
const LEFT_RIGHT_PADDING = 4
const MODAL_ROUND = 2
// Header sits inside the 1px content border, so its corners use the inner radius (8px - 1px).
const HEADER_ROUND = { side: "top", size: 1.75 }

const Surface = styled(Flex)`
  box-shadow: ${props =>
    props.appearance === "dialog" ? dialogShadow(props) : modalShadow(props)};
`

export const ModalContent = ({
  appearance,
  background = "modalBackground",
  children,
  testId,
  ...rest
}) => (
  <Surface
    appearance={appearance}
    background={background}
    border
    column
    data-testid={testId}
    round={appearance === "dialog" ? 3 : MODAL_ROUND}
    {...rest}
  >
    {children}
  </Surface>
)

export const ModalHeader = ({ children, testId, ...rest }) => (
  <Flex
    alignItems="center"
    background="modalHeaderBackground"
    data-testid={testId}
    padding={[TOP_BOTTOM_PADDING, LEFT_RIGHT_PADDING]}
    round={HEADER_ROUND}
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

export const ModalFooter = ({
  children,
  hasBorder = true,
  parentPadding,
  testId,
  containerProps = {},
  ...rest
}) => (
  <Flex column padding={parentPadding || [0, LEFT_RIGHT_PADDING]} flex={1} {...containerProps}>
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

// Offsets stay overridable props, so they are resolved from the theme here rather than in CSS.
export const ModalCloseButton = ({ onClose, testId, ...rest }) => {
  const theme = useTheme()

  return (
    <ModalButton
      iconName="x"
      onClick={onClose}
      testId={testId}
      position="absolute"
      height="14px"
      width="14px"
      top={getSizeBy(1.25)({ theme })}
      right={getSizeBy(1.5)({ theme })}
      {...rest}
    />
  )
}

const Modal = ({ appearance, children, backdropProps, ...rest }) => {
  const theme = useTheme()
  const dialog = appearance === "dialog"

  return (
    <Layer
      {...(dialog && { margin: [4], zIndex: 120, backdropContainerProps: { zIndex: 120 } })}
      backdropProps={{
        ...(dialog && {
          background: "onColorDark",
          backgroundOpacity: isDarkTheme({ theme }) ? 0.5 : 0.28,
          backdropBlur: 2,
        }),
        ...backdropProps,
      }}
      {...rest}
    >
      {children}
    </Layer>
  )
}

export default Modal
