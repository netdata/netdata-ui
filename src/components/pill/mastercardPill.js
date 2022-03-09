import React, { forwardRef } from "react"
import { getMasterCardBackground } from "./mixins/background"
import Pill from "./index"

const minWidths = {
  default: "29px",
  large: "37px",
}

const MasterCardPill = forwardRef(({ 'data-testid': dataTestId, flavour, isAlert, isClickable, onClick, side, text, ...rest }, ref) => {
  const isLeft = side === "left"
  const background = getMasterCardBackground(
    rest.background,
    flavour || (isLeft ? "disabledError" : "disabledWarning")
  )
  const sideProps =
    isLeft
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
      data-testid={dataTestId || "mastercard-pill"}
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
