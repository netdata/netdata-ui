import React, { forwardRef } from "react"
import Flex from "src/components/templates/flex";
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
    backgrounds,
    colors,
    'data-testids': dataTestids,
    flavours = ["neutralGrey", "neutralIron"],
    height,
    normal,
    onClick,
    onClicks,
    refs,
    round,
    size,
    texts,
    ...rest
  }, ref) => (
    <MasterCardContainer
      background={getBackground(backgrounds?.[1], flavours?.[1] || "neutralIron")}
      height={height}
      onClick={onClick}
      round={round}
      size={size}
      ref={ref}
    >
      {flavours.map((flavour, index) => {
        const elementFlavour = flavour || (index === 0 ? "neutralGrey" : "neutralIron")
        const background = getBackground(backgrounds?.[index], elementFlavour)
        const pillProps = {
          ...rest,
          ...(!onClick && { onClick: onClicks?.[index] })
        }

        return (
          <Pill
            background={background}
            borderColor={background}
            color={colors?.[index]}
            data-testid={dataTestids?.[index]}
            flavour={elementFlavour}
            height={height}
            key={`${elementFlavour}_${index}`}
            marginLeft={index === 1 && "-4px"}
            normal={normal}
            position={index === 0 && "relative"}
            ref={refs?.[index]}
            round={round}
            size={size}
            width={index === 0 && { min: minWidths[size] || minWidths.default }}
            padding={index === 0 ? [1, 3] : [1, 2]}
            {...pillProps}>
            {texts?.[index] || "-"}
          </Pill>
        )
      })}
    </MasterCardContainer>
  )
)

export default MasterCard
