import React from "react"
import Flex from "src/components/templates/flex"
import { Button } from "src/components/button"
import { Text } from "src/components/typography"
import useToggle from "react-use/lib/useToggle"
import { Actions, Body, CloseButton, Content, Dialog, Header, Title, TitleIcon } from "./styled"

const BodyMessage = ({ children, ...rest }) =>
  typeof children === "object" ? children : <Text {...rest}>{children}</Text>

const ConfirmationDialog = ({
  confirmLabel = "Yes, remove",
  confirmLoadingLabel = "Loading...",
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
  isConfirmPositive,
  message,
  title,
  showConfirmLoading,
  disableConfirmOnLoading,
}) => {
  const [loading, toggleLoading] = useToggle(false)

  const onConfirm = e => {
    if (showConfirmLoading) toggleLoading()
    handleConfirm(e, toggleLoading)
  }

  return (
    <Dialog onEsc={handleDecline}>
      <Content data-testid={dataTestId}>
        <Header data-testid={`${dataTestId}-headerContainer`}>
          <Flex data-testid={`${dataTestId}-header`} gap={4}>
            {!hideIcon && <TitleIcon data-testid={`${dataTestId}-headerIcon`} name={iconName} />}
            <Title data-testid={`${dataTestId}-headerText`}>{title}</Title>
          </Flex>
          {handleDecline && (
            <CloseButton data-testid={`${dataTestId}-headerClose`} onClose={handleDecline} />
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
              label={declineLabel}
              onClick={handleDecline}
              width={declineWidth}
            />
          )}
          <Button
            data-ga={`${dataGA}-::click-confirm::global-view`}
            data-testid={`${dataTestId}-confirmAction`}
            danger={!isConfirmPositive && true}
            disabled={isConfirmDisabled || (disableConfirmOnLoading && loading)}
            label={loading ? confirmLoadingLabel : confirmLabel}
            onClick={onConfirm}
            width={confirmWidth}
            isLoading={loading}
          />
        </Actions>
      </Content>
    </Dialog>
  )
}

export default ConfirmationDialog
