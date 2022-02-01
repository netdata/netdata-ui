import { FC } from "react"
import { PillProps } from "src/components/pill/index"

export type MasterCardFlavour = "error" | "neutralGrey" | "neutralIron" | "warning"
export type MasterCardPillPosition = "left" | "right"

export interface MasterCardPillProps extends PillProps {
  isClickable?: boolean
  side?: MasterCardPillPosition
  [s: string]: any
}

declare const MasterCardPill: FC<MasterCardPillProps>

export { MasterCardPill }

export default MasterCardPill
