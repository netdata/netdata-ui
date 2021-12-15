import React from "react"
import { Icon } from "src/components/icon"
import { getPillColor } from "./mixins/colors"

const PillIcon = ({ icon, color, hollow, flavour }) => {
  if (!icon) return null
  if (typeof icon !== "string") return icon

  return (
    <Icon
      width="14px"
      height="14px"
      name={icon}
      color={color || (hollow ? getPillColor("color", flavour) : "bright")}
    />
  )
}

export default PillIcon
