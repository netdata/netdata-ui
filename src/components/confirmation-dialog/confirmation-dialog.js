import React from "react"
import { useTheme } from "styled-components"
import Flex from "@/components/templates/flex"
import { Button } from "@/components/button"
import Modal, { ModalCloseButton } from "@/components/modal"
import { Text } from "@/components/typography"
import { getSizeBy } from "@/theme/utils"
import { Actions, Body, Content, Header, Title, TitleIcon } from "./styled"

const BodyMessage = ({ children, ...rest }) =>
  typeof children === "object" ? children : <Text {...rest}>{children}</Text>

const ConfirmationDialog = ({
  confirmLabel = "Yes, remove",
  confirmWidth = "128px",
  "data-ga": dataGA = "confirmation-dialog",
  "data-testid": dataTestId = "confirmationDialog",
  declineLabel = "Cancel",
  declineWidth = "128px",
  handleConfirm,
  handleDecline,
  handleMiddle,
  middleLabel,
  middleWidth = "128px",
  hideIcon,
  iconName = "warning_triangle_hollow",
  isConfirmDisabled,
  isConfirmLoading,
  isDeclineDisabled,
  isConfirmPositive,
  message,
  title,
  backdropContainerProps,
  ...props
}) => {
  const theme = useTheme()

  return (
    <Modal onEsc={handleDecline} backdropContainerProps={backdropContainerProps} {...props}>
      <Content data-testid={dataTestId}>
        <Header data-testid={`${dataTestId}-headerContainer`}>
          <Flex alignItems="center" data-testid={`${dataTestId}-header`} gap={2}>
            {!hideIcon && (
              <TitleIcon
                color={isConfirmPositive ? "main" : "error"}
                data-testid={`${dataTestId}-headerIcon`}
                name={iconName}
              />
            )}
            <Title data-testid={`${dataTestId}-headerText`}>{title}</Title>
          </Flex>
          {handleDecline && (
            <ModalCloseButton
              data-testid={`${dataTestId}-headerClose`}
              onClose={handleDecline}
              right={getSizeBy(2)({ theme })}
              top={getSizeBy(1.75)({ theme })}
            />
          )}
        </Header>
        <Body data-testid={`${dataTestId}-body`}>
          <BodyMessage data-testid={`${dataTestId}-bodyMessage`}>{message}</BodyMessage>
        </Body>
        <Actions data-testid={`${dataTestId}-actions`}>
          {handleDecline && (
            <Button
              data-ga={`${dataGA}-::click-cancel::global-view`}
              data-testid={`${dataTestId}-cancelAction`}
              flavour="hollow"
              neutral={!isConfirmPositive}
              disabled={isDeclineDisabled}
              label={declineLabel}
              onClick={handleDecline}
              width={declineWidth}
            />
          )}
          {handleMiddle && (
            <Button
              data-ga={`${dataGA}-::click-middle::global-view`}
              data-testid={`${dataTestId}-middleAction`}
              flavour="hollow"
              danger={!isConfirmPositive && true}
              label={middleLabel}
              onClick={handleMiddle}
              width={middleWidth}
            />
          )}
          <Button
            data-ga={`${dataGA}-::click-confirm::global-view`}
            data-testid={`${dataTestId}-confirmAction`}
            danger={!isConfirmPositive && true}
            disabled={isConfirmDisabled}
            label={confirmLabel}
            onClick={handleConfirm}
            width={confirmWidth}
            isLoading={isConfirmLoading}
          />
        </Actions>
      </Content>
    </Modal>
  )
}

export default ConfirmationDialog
