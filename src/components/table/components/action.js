import React, { useState, useMemo } from "react"

import Tooltip from "@/components/drops/tooltip"
import Flex from "@/components/templates/flex"

import { ConfirmationDialog } from "@/components/confirmation-dialog"
import { Button, IconButton } from "@/components/button"

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
  dataGa,
  disabled,
  visible,
  currentRow,
  selectedRows,
  disabledTooltipText,
  iconColor,
  flavour = "borderless",
  CustomUIAction,
  CustomComponent,
  label,
  TooltipComponent = Tooltip,
  ref,
  ...rest
}) => {
  const [isConfirmationOpen, setConfirmationOpen] = useState(false)
  if (visible === false) return null

  const onActionClicked = e => {
    e.stopPropagation()
    if (confirmation || CustomUIAction) {
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

  const Component = CustomComponent || (label ? Button : IconButton)

  const componentProps = useMemo(
    () => ({
      iconSize: "small",
      "data-testid": `netdata-table-action-${id}${testPrefix}`,
      "data-ga": dataGa,
      disabled: disabled,
      onClick: onActionClicked,
      icon: typeof icon === "function" ? icon(currentRow?.original) : icon,
      flavour,
      iconColor,
      label,
      padding: [0.5],
      ...(CustomComponent ? { data: currentRow?.original || selectedRows } : {}),
      ...rest,
    }),
    [
      id,
      testPrefix,
      dataGa,
      disabled,
      onActionClicked,
      icon,
      flavour,
      iconColor,
      label,
      currentRow?.original,
      selectedRows,
      CustomComponent,
      rest,
    ]
  )

  return (
    <>
      {isConfirmationOpen && CustomUIAction && (
        <CustomUIAction
          handleAction={handleAction()}
          onClose={() => setConfirmationOpen(false)}
          data={currentRow?.original || selectedRows}
        />
      )}
      {isConfirmationOpen && !CustomUIAction && (
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
      <TooltipComponent content={disabled ? disabledTooltipText : tooltipText}>
        <Flex
          ref={ref}
          alignItems="center"
          justifyContent="center"
          _hover={{ background: disabled || label ? null : "borderSecondary" }}
          cursor={disabled ? "auto" : "pointer"}
          key={id}
          round
          background={label ? null : background}
        >
          <Component {...componentProps} />
        </Flex>
      </TooltipComponent>
    </>
  )
}

export default Action
