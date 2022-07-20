import React from "react"
import Flex from "src/components/templates/flex"
import { Button } from "src/components/button"
import { Text } from "src/components/typography"
import { Actions, Body, CloseButton, Content, Dialog, Header, Title, TitleIcon } from "./styled"

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
  isConfirmPositive,
  message,
  title,
}) => {
  const BodyMessage =
    typeof message === "object"
      ? () => message
      : () => <Text data-testid={`${dataTestId}-bodyMessage`}>{message}</Text>

  return (
    <Dialog onEsc={handleDecline}>
      <Content data-testid={dataTestId}>
        <Header data-testid={`${dataTestId}-headerContainer`}>
          <Flex data-testid={`${dataTestId}-header`} gap={4}>
            {!hideIcon && <TitleIcon data-testid={`${dataTestId}-headerIcon`} name={iconName} />}
            <Title data-testid={`${dataTestId}-headerText`}>{title}</Title>
          </Flex>
          <CloseButton data-testid={`${dataTestId}-headerClose`} onClose={handleDecline} />
        </Header>
        <Body data-testid={`${dataTestId}-body`}>
          <BodyMessage />
        </Body>
        <Actions data-testid={`${dataTestId}-actions`}>
          <Button
            data-ga={`${dataGA}-::click-cancel::global-view`}
            data-testid={`${dataTestId}-cancelAction`}
            flavour="hollow"
            label={declineLabel}
            onClick={handleDecline}
            width={declineWidth}
          />
          <Button
            data-ga={`${dataGA}-::click-confirm::global-view`}
            data-testid={`${dataTestId}-confirmAction`}
            danger={!isConfirmPositive && true}
            label={confirmLabel}
            onClick={handleConfirm}
            width={confirmWidth}
          />
        </Actions>
      </Content>
    </Dialog>
  )
}

export default ConfirmationDialog
