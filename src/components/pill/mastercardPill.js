import React, { forwardRef } from "react"
import { getMasterCardBackground } from "./mixins/background"
import Pill from "./index"

const minWidths = {
  default: "29px",
  large: "37px",
}

const MasterCardPill = forwardRef(
  ({ isClickable, flavour, onClick, side, text, ...rest }, ref) => {
    const background = getMasterCardBackground(rest.background, flavour || (side === "left" ? "neutralGrey" : "neutralIron"))
    const positionProps = side === "left" ? {
      padding: [1, 3],
      position: "relative",
      width: { min: minWidths[rest.size] || minWidths.default }
    } : {
      margin: [0, 0, 0, -1],
      padding: [1, 2],
    }

    return (
      <Pill
        background={background}
        borderColor={background}
        onClick={isClickable && onClick}
        ref={ref}
        {...positionProps}
        {...rest}
      >
        {text || "-"}
      </Pill>
    )
  }
)

export default MasterCardPill
