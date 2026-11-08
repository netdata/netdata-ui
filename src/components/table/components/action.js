import React, { useState, useMemo, useImperativeHandle } from "react"
import Tooltip from "@/components/drops/tooltip"
import styled, { css } from "styled-components"
import Flex from "@/components/templates/flex"
import { getColor, getRgbColor } from "@/theme"
import { ConfirmationDialog } from "@/components/confirmation-dialog"
import { Button, IconButton } from "@/components/button"

const chipInteraction = css`
  border-color: ${getRgbColor("primary", 0.5)};
  background: ${getRgbColor("primary", 0.1)};

  .button-icon {
    fill: ${getColor("primary")};
  }
`

const Chip = styled(IconButton)`
  && {
    color: ${getColor("textLite")};
    border-color: var(--table-action-chip-border, ${getColor("border")});
  }

  &&:hover:not(:disabled):not([aria-disabled="true"]),
  &&:focus-visible:not(:disabled):not([aria-disabled="true"]) {
    ${chipInteraction}
  }
`

const QuietChip = styled(Chip)`
  --table-action-chip-border: transparent;

  &&[aria-expanded="true"]:not(:disabled):not([aria-disabled="true"]) {
    ${chipInteraction}
  }
`

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
  onCustomComponentClick,
  label,
  TooltipComponent = Tooltip,
  ref,
  rowChip,
  bulkChip,
  hiddenControl,
  activationRef,
  ...rest
}) => {
  const [isConfirmationOpen, setConfirmationOpen] = useState(false)

  const onActionClicked = e => {
    e.stopPropagation()
    if (confirmation || CustomUIAction) {
      setConfirmationOpen(true)
      if (typeof onCustomComponentClick === "function") {
        onCustomComponentClick(currentRow?.original || selectedRows)
      }
      return
    }
    handleAction()
  }

  useImperativeHandle(activationRef, () => onActionClicked)

  const onActionDeclined = () => {
    setConfirmationOpen(false)
    handleDecline?.()
  }

  const onActionConfirmed = () => {
    setConfirmationOpen(false)
    handleAction?.()
  }

  const chip = !label && !CustomComponent && (bulkChip ? QuietChip : rowChip ? Chip : null)
  const Component = CustomComponent || chip || (label ? Button : IconButton)

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
      ...(chip
        ? {
            type: "button",
            round: "50%",
            iconColor: iconColor || "textLite",
            ...(bulkChip ? { compact: true } : { width: "14px", height: "14px" }),
            "aria-label": typeof tooltipText === "string" ? tooltipText : id,
          }
        : {}),
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
      chip,
      bulkChip,
      tooltipText,
      rest,
    ]
  )

  if (visible === false) return null

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
      {!hiddenControl && (
        <TooltipComponent content={disabled ? disabledTooltipText : tooltipText}>
          <Flex
            ref={ref}
            alignItems="center"
            justifyContent="center"
            _hover={{ background: chip || disabled || label ? null : "borderSecondary" }}
            cursor={disabled ? "auto" : "pointer"}
            key={id}
            round
            background={
              label || bulkChip ? null : rest["aria-expanded"] ? "borderSecondary" : background
            }
          >
            <Component {...componentProps} />
          </Flex>
        </TooltipComponent>
      )}
    </>
  )
}

export default Action
