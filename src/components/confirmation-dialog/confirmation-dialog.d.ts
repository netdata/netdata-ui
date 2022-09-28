import { FC, SyntheticEvent } from "react"

type OnClickType = (e: SyntheticEvent<HTMLButtonElement>) => void

export interface ConfirmationDialogProps {
  confirmLabel?: string
  confirmWidth?: string
  "data-ga"?: string
  "data-testid"?: string
  declineLabel?: string
  declineWidth?: string
  handleConfirm: OnClickType
  handleDecline?: OnClickType
  hideIcon?: boolean
  iconName?: string
  isConfirmDisabled?: boolean
  isConfirmPositive?: boolean
  message: JSX.Element | string
  title: string
}

declare const ConfirmationDialog: FC<ConfirmationDialogProps>

export { ConfirmationDialog }

export default ConfirmationDialog
