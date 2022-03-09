import React, { forwardRef } from "react"
import { getMasterCardBackground } from "./mixins/background"
import Pill from "./index"

const minWidths = {
  default: "29px",
  large: "37px",
}

const MasterCardPill = forwardRef(({ flavour, isAlert, isClickable, onClick, side, text, ...rest }, ref) => {
  const background = getMasterCardBackground(
    rest.background,
    flavour || (side === "left" ? "disabledError" : "disabledWarning")
  )
  const sideProps =
    side === "left"
      ? {
          padding: isAlert ? [1, 2] : [1, 3],
          position: "relative",
          ...(!isAlert && { width: { min: minWidths[rest.size] || minWidths.default } }),
        }
      : {
          margin: [0, 0, 0, -1],
          padding: [1, 2],
        }

  return (
    <Pill
      background={background}
      borderColor={background}
      onClick={isClickable ? onClick : null}
      ref={ref}
      {...sideProps}
      {...rest}
    >
      {text || "-"}
    </Pill>
  )
})

export default MasterCardPill
