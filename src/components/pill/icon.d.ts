import { FC } from "react"
import { PillFlavour } from "./index"
import { IconProps } from "../icon/index"

export interface PillIconProps extends IconProps {
  icon?: string
  hollow?: boolean
  flavour?: PillFlavour
}

declare const PillIcon: FC<PillIconProps>

export { PillIcon }

export default PillIcon
