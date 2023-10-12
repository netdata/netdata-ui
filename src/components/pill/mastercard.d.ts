import { FC, SyntheticEvent } from "react"
import { RoundProps } from "@/mixins/types"
import { HeightProps } from "@/components/templates/mixins"
import { PillProps } from "@/components/pill/index"

export type MasterCardFlavour = "disabledError" | "disabledWarning" | "error" | "warning"
export type MasterCardRef = { [key: string]: Element }
export type MasterCardSize = "default" | "large"

type OnClickType = (e: SyntheticEvent<HTMLButtonElement>) => void

export interface MasterCardProps extends HeightProps, RoundProps {
  "data-testid"?: string
  normal?: boolean
  onClick?: OnClickType
  pillLeft?: PillProps
  pillRight?: PillProps
  ref?: MasterCardRef
  size?: MasterCardSize
  [s: string]: any
}

declare const MasterCard: FC<MasterCardProps>

export { MasterCard }

export default MasterCard
