import React, { useState } from "react"

import Tooltip from "src/components/drops/tooltip"
import Flex from "src/components/templates/flex"
import { Text } from "src/components/typography"

import { ConfirmationDialog } from "src/components/confirmation-dialog"
import { IconButton } from "src/components/button"

const Action = ({
  id,
  icon,
  background,
  handleAction,
  tooltipText,
  confirmation,
  confirmationTitle,
  confirmationMessage,
  handleDecline,
  confirmLabel,
  declineLabel,
  actionButtonDirection,
  testPrefix,
  disabled,
  currentRow,
  selectedRows,
  disabledTooltipText,
}) => {
  const [isConfirmationOpen, setConfirmationOpen] = useState(false)

  const onActionClicked = () => {
    if (confirmation) {
      setConfirmationOpen(true)
      return
    }
    handleAction()
  }

  const onActionDeclined = () => {
    setConfirmationOpen(false)
    handleDecline?.()
  }

  const onActionConfrimed = () => {
    setConfirmationOpen(false)

    handleAction?.()
  }

  return (
    <>
      {isConfirmationOpen && (
        <ConfirmationDialog
          actionButtonDirection={actionButtonDirection}
          declineLabel={declineLabel}
          confirmLabel={confirmLabel}
          title={
            typeof confirmationTitle === "function" ? (
              <Text>{confirmationTitle(currentRow?.original, selectedRows)}</Text>
            ) : (
              <Text>confirmationTitle</Text>
            )
          }
          message={
            typeof confirmationMessage === "function" ? (
              <Text>{confirmationMessage(currentRow?.original, selectedRows)}</Text>
            ) : (
              <Text>{confirmationMessage}</Text>
            )
          }
          handleDecline={onActionDeclined}
          handleConfirm={onActionConfrimed}
        />
      )}
      <Tooltip content={disabled ? disabledTooltipText : tooltipText}>
        <Flex
          alignItems="center"
          justifyContent="center"
          _hover={{ background: disabled ? null : "borderSecondary" }}
          cursor={disabled ? "auto" : "pointer"}
          key={id}
          round
          background={background}
        >
          <IconButton
            iconSize="small"
            data-testid={`netdata-table-action-${id}${testPrefix}`}
            disabled={disabled}
            onClick={onActionClicked}
            icon={icon}
            flavour="borderless"
          />
        </Flex>
      </Tooltip>
    </>
  )
}

export default Action
