import React, { useState } from "react"

import Tooltip from "src/components/drops/tooltip"
import Flex from "src/components/templates/flex"
import Box from "src/components/templates/box"
import { Icon } from "src/components/icon"

import { ConfirmationDialog } from "src/components/confirmation-dialog"

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
          declineLabel={declineLabel}
          confirmLabel={confirmLabel}
          title={confirmationTitle}
          message={confirmationMessage}
          handleDecline={onActionDeclined}
          handleConfirm={onActionConfrimed}
        />
      )}
      <Tooltip content={tooltipText}>
        <Flex
          alignItems="center"
          justifyContent="center"
          height={"100%"}
          _hover={{ background: "borderSecondary" }}
          cursor="pointer"
          key={id}
          width={10}
          onClick={onActionClicked}
        >
          <Box as={Icon} name={icon} />
        </Flex>
      </Tooltip>
    </>
  )
}

export default Action
