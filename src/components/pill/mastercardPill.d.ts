import { FC } from "react"
import { RefType } from "src/mixins/types"
import { PillProps } from "./index"

export type MasterCardPillPosition = "left" | "right"

export interface MasterCardPillProps extends PillProps {
  "data-testid"?: string
  isClickable?: boolean
  ref?: RefType
  side?: MasterCardPillPosition
  [s: string]: any
}

declare const MasterCardPill: FC<MasterCardPillProps>

export { MasterCardPill }

export default MasterCardPill
