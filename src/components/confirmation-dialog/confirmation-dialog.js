import React from "react"
import Flex from "@/components/templates/flex"
import { Button } from "@/components/button"
import { ModalCloseButton } from "@/components/modal"
import { Text } from "@/components/typography"
import { Actions, Body, Content, Dialog, Header, Title, TitleIcon } from "./styled"

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
  hideIcon,
  iconName = "warning_triangle_hollow",
  isConfirmDisabled,
  isConfirmLoading,
  isDeclineDisabled,
  isConfirmPositive,
  message,
  title,
  backdropContainerProps,
}) => {
  return (
    <Dialog onEsc={handleDecline} backdropContainerProps={backdropContainerProps}>
      <Content data-testid={dataTestId}>
        <Header data-testid={`${dataTestId}-headerContainer`}>
          <Flex data-testid={`${dataTestId}-header`} gap={2}>
            {!hideIcon && <TitleIcon data-testid={`${dataTestId}-headerIcon`} name={iconName} />}
            <Title data-testid={`${dataTestId}-headerText`}>{title}</Title>
          </Flex>
          {handleDecline && (
            <ModalCloseButton data-testid={`${dataTestId}-headerClose`} onClose={handleDecline} />
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
              disabled={isDeclineDisabled}
              label={declineLabel}
              onClick={handleDecline}
              width={declineWidth}
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
    </Dialog>
  )
}

export default ConfirmationDialog
