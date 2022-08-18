import React, { useState, forwardRef } from "react"

import Tooltip from "src/components/drops/tooltip"
import Flex from "src/components/templates/flex"

import { ConfirmationDialog } from "src/components/confirmation-dialog"
import { IconButton } from "src/components/button"

const Action = forwardRef(
  (
    {
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
      dataGa,
      disabled,
      visible,
      currentRow,
      selectedRows,
      disabledTooltipText,
    },
    ref
  ) => {
    const [isConfirmationOpen, setConfirmationOpen] = useState(false)
    if (visible === false) return null

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

    const onActionConfirmed = () => {
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
                ? confirmationTitle(currentRow?.original, selectedRows)
                : confirmationTitle
            }
            message={
              typeof confirmationMessage === "function"
                ? confirmationMessage(currentRow?.original, selectedRows)
                : confirmationMessage
            }
            handleDecline={onActionDeclined}
            handleConfirm={onActionConfirmed}
          />
        )}
        <Tooltip content={disabled ? disabledTooltipText : tooltipText}>
          <Flex
            ref={ref}
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
              data-ga={dataGa}
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
)

export default Action
