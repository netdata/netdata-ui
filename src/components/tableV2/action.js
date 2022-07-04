import React, { useState } from "react"

import Tooltip from "src/components/drops/tooltip"
import Flex from "src/components/templates/flex"
import Box from "src/components/templates/box"

import { ConfirmationDialog } from "src/components/confirmation-dialog"
import { Button } from "src/components/button"

const Action = ({
  id,
  icon,
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
            typeof confirmationTitle === "function"
              ? confirmationTitle(currentRow?.original)
              : confirmationTitle
          }
          message={
            typeof confirmationMessage === "function"
              ? confirmationMessage(currentRow?.original)
              : confirmationMessage
          }
          handleDecline={onActionDeclined}
          handleConfirm={onActionConfrimed}
        />
      )}
      <Tooltip content={tooltipText}>
        <Flex
          data-testid={`netdata-table-action-${id}${testPrefix}`}
          alignItems="center"
          justifyContent="center"
          _hover={{ background: disabled ? null : "borderSecondary" }}
          cursor={disabled ? "auto" : "pointer"}
          key={id}
          round
          padding={[1.5]}
        >
          <Box
            width={4}
            height={4}
            disabled={disabled}
            onClick={onActionClicked}
            as={Button}
            icon={icon}
            flavour="borderless"
          />
        </Flex>
      </Tooltip>
    </>
  )
}

export default Action
