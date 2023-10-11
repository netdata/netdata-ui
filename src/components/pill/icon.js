import React from "react"
import { Icon } from "@/components/icon"
import { getPillColor } from "./mixins/colors"

const PillIcon = ({ icon, color, hollow, flavour, size, ...rest }) => {
  if (!icon) return null
  if (typeof icon !== "string") return icon

  return (
    <Icon
      color={color || (hollow ? getPillColor("color", flavour) : "bright")}
      data-testid="pill-icon"
      height={size || "14px"}
      width={size || "14px"}
      name={icon}
      {...rest}
    />
  )
}

export default PillIcon
