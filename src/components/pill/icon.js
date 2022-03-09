import React from "react"
import { Icon } from "src/components/icon"
import { getPillColor } from "./mixins/colors"

const PillIcon = ({ icon, color, 'data-testid': dataTestId, hollow, flavour, size }) => {
  if (!icon) return null
  if (typeof icon !== "string") return icon

  return (
    <Icon
      color={color || (hollow ? getPillColor("color", flavour) : "bright")}
      data-testid={dataTestId || "pill-icon"}
      height={size || "14px"}
      width={size || "14px"}
      name={icon}
    />
  )
}

export default PillIcon
