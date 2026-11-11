// Copied from PR 5951: components/confirmDialog.js. useDialogFocus (focus trap/return) is replaced by a
// plain Escape listener; the markup and styles are unchanged.
import { useEffect, useId } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"
import Box from "@/components/templates/box"
import { Icon } from "@/components/icon"
import { getColor, getSizeBy } from "@/theme"
import { focusRingAt } from "./tokens"

const Backdrop = styled(Box)`
  position: ${({ inline }) => (inline ? "relative" : "fixed")};
  inset: 0;
  z-index: 120;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${getSizeBy(2)};
  background: var(--dyncfg-backdrop);
  backdrop-filter: blur(2px);
`

const Panel = styled(Box)`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  max-height: calc(100vh - ${getSizeBy(4)});
  overflow: hidden;
  border-radius: var(--dyncfg-radius-lg);
  border: 1px solid var(--dyncfg-dialog-border);
  background: ${getColor("modalBackground")};
  box-shadow: var(--dyncfg-dialog-shadow);
  color: ${getColor("text")};
  outline: none;
`

const DialogContent = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${getSizeBy(1)};
  padding: ${getSizeBy(3)} ${getSizeBy(3)} 0;
`

const DialogTitle = styled(Box).attrs({ as: "h2" })`
  display: flex;
  align-items: center;
  gap: ${getSizeBy(1.25)};
  margin: 0;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: ${getColor("textFocus")};
`

const DialogMessage = styled(Box)`
  font-size: 13px;
  line-height: 20px;
  color: var(--dyncfg-text-secondary);
  overflow-wrap: anywhere;

  strong {
    font-weight: 600;
    color: ${getColor("textFocus")};
  }
`

const DialogActions = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${getSizeBy(1)};
  padding: ${getSizeBy(3)};
`

const DialogButton = styled(Box).attrs({ as: "button" })`
  min-width: ${getSizeBy(10)};
  height: ${getSizeBy(4)};
  padding: 0 ${getSizeBy(1.75)};
  border-radius: var(--dyncfg-radius-sm);
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background 120ms ease,
    border-color 120ms ease;

  ${focusRingAt(2)}

  &:disabled {
    cursor: not-allowed;
  }
`

export const NeutralButton = styled(DialogButton)`
  border: 1px solid var(--dyncfg-control-border);
  background: transparent;
  color: ${getColor("textFocus")};

  &:disabled {
    border-color: var(--dyncfg-disabled-border);
    color: var(--dyncfg-disabled-text);
  }

  &:hover:not(:disabled) {
    background: var(--dyncfg-row-hover);
  }
`

const filledDisabled = `
  &:disabled {
    border-color: var(--dyncfg-disabled-fill);
    background: var(--dyncfg-disabled-fill);
    color: var(--dyncfg-disabled-fill-text);
  }
`

export const DangerButton = styled(DialogButton)`
  border: 1px solid transparent;
  background: var(--dyncfg-danger-fill);
  color: var(--dyncfg-danger-label);

  &:hover:not(:disabled) {
    filter: brightness(1.08);
  }

  ${filledDisabled}
`

export const PrimaryButton = styled(DialogButton)`
  border: 1px solid transparent;
  background: var(--dyncfg-primary-fill);
  color: var(--dyncfg-primary-label);

  &:hover:not(:disabled) {
    filter: brightness(1.08);
  }

  ${filledDisabled}
`

// `inline` renders the dialog in place (story preview); the PR always portals to document.body.
export const ConfirmDialog = ({
  title,
  message,
  confirmLabel = "Confirm",
  declineLabel = "Cancel",
  onConfirm,
  onDecline,
  destructive = true,
  isConfirmDisabled = false,
  inline = false,
}) => {
  const titleId = useId()
  const messageId = useId()
  const ConfirmButton = destructive ? DangerButton : PrimaryButton

  useEffect(() => {
    const onKey = event => event.key === "Escape" && onDecline?.()
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onDecline])

  const dialog = (
    <Backdrop inline={inline}>
      <Panel
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={messageId}
        width="min(440px, calc(100vw - 32px))"
      >
        <DialogContent>
          <DialogTitle id={titleId}>
            {destructive ? (
              <Icon
                name="warning_triangle_hollow"
                width="20px"
                height="20px"
                color="var(--dyncfg-error-text)"
                aria-hidden="true"
              />
            ) : null}
            <span>{title}</span>
          </DialogTitle>
          {message ? <DialogMessage id={messageId}>{message}</DialogMessage> : null}
        </DialogContent>
        <DialogActions>
          <NeutralButton type="button" onClick={onDecline}>
            {declineLabel}
          </NeutralButton>
          <ConfirmButton type="button" disabled={isConfirmDisabled} onClick={onConfirm}>
            {confirmLabel}
          </ConfirmButton>
        </DialogActions>
      </Panel>
    </Backdrop>
  )

  return inline ? dialog : createPortal(dialog, document.body)
}
