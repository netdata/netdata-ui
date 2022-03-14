import { FC } from "react"
import { PillProps } from "./index"

export interface MasterCardPillProps extends PillProps {
  text?: string
}

declare const MasterCardPill: FC<MasterCardPillProps>

export { MasterCardPill }

export default MasterCardPill
