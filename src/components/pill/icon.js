import React from "react"
import { Icon } from "@/components/icon"
import { getPillColor } from "./mixins/colors"

const sizes = {
  default: "14px",
  large: "16px",
}

const PillIcon = ({ icon, color, hollow, flavour, size, ...rest }) => {
  if (!icon) return null
  if (typeof icon !== "string") return icon

  return (
    <Icon
      color={color || (hollow ? getPillColor("color", flavour) : "bright")}
      data-testid="pill-icon"
      height={sizes[size] || sizes.default}
      width={sizes[size] || sizes.default}
      name={icon}
      {...rest}
    />
  )
}

export default PillIcon
