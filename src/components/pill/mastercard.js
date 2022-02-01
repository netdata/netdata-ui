import React, { forwardRef } from "react"
import Pill from "./index"
import { getMasterCardColor } from "./mixins/colors"
import { MasterCardContainer } from "./styled"

const minWidths = {
  default: "29px",
  large: "37px",
}

const getBackground = (background, flavour) => background || getMasterCardColor(flavour)

const MasterCard = forwardRef(
  ({
    height,
    normal,
    onClick,
    pillLeft = {},
    pillRight = {},
    round,
    size,
    ...rest
  }, ref) => (
    <MasterCardContainer
      background={getBackground(pillRight.background, pillRight.flavour || "neutralIron")}
      height={height}
      onClick={onClick}
      round={round}
      size={size}
      ref={ref}
    >
      {[pillLeft, pillRight].map(({ background, flavour, onClick: pillOnClick, text, ...pillRest }, index) => {
        const pillFlavour = flavour || (index === 0 ? "neutralGrey" : "neutralIron")
        const pillBackground = getBackground(background, pillFlavour)
        const pillProps = {
          background: pillBackground,
          borderColor: pillBackground,
          height,
          normal,
          round,
          size,
          ...(!onClick && { onClick: pillOnClick }),
          ...(index === 0 ? {
            padding: [1, 3],
            position: "relative",
            width: { min: minWidths[size] || minWidths.default }
          } : {
            margin: [0, 0, 0, -1],
            padding: [1, 2],
          }),
          ...pillRest,
          ...rest,
        }

        return (
          <Pill
            key={`${pillFlavour}_${index}`}
            {...pillProps}>
            {text || "-"}
          </Pill>
        )
      })}
    </MasterCardContainer>
  )
)

export default MasterCard
