import { FC, SyntheticEvent } from "react"
import { RoundProps } from "src/mixins/types"
import { HeightProps } from "src/components/templates/mixins";

export type MasterCardFlavour = "neutralGrey" | "neutralIron" | "red" | "yellow"
export type MasterCardRef = { [key: string]: (Element) }
export type MasterCardSize = "default" | "large"

type MasterCardArrayOfStringsType = [string, string]
type OnClickType = (e: SyntheticEvent<HTMLButtonElement>) => void

export interface MasterCardProps extends HeightProps, RoundProps {
  backgrounds?: MasterCardArrayOfStringsType
  colors?: MasterCardArrayOfStringsType
  'data-testids'?: MasterCardArrayOfStringsType
  flavours?: [MasterCardFlavour, MasterCardFlavour]
  normal?: boolean
  onClick?: OnClickType
  onClicks?: [OnClickType, OnClickType]
  refs?: [MasterCardRef, MasterCardRef]
  size?: MasterCardSize,
  texts?: MasterCardArrayOfStringsType
  [s: string]: any
}

declare const MasterCard: FC<MasterCardProps>

export { MasterCard }

export default MasterCard
