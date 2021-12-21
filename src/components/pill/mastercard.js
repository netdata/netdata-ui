import React from "react"
import Flex from "src/components/templates/flex";
import Pill from "./index"
import { getMasterCardColor } from "./mixins/colors"
import getPillHeight from "./mixins/height";

const margins = {
  default: "-3px",
  large: "-5px",
}

const minWidths = {
  default: "29px",
  large: "37px",
}

const getBackground = (background, flavour) => background || getMasterCardColor(flavour)

const MasterCard = ({
  backgrounds,
  colors,
  flavours = ["neutralGrey", "neutralIron"],
  height,
  normal,
  refs,
  round,
  size,
  texts,
  ...rest
}) => (
  <Flex
    background={getBackground(backgrounds?.[1], flavours?.[1])}
    height={getPillHeight(height, size)}
    round={round || 999}
    size={size}
  >
    {flavours.map((flavour, index) => {
      const background = getBackground(backgrounds?.[index], flavour)

      return (
        <Pill
          background={background}
          borderColor={background}
          color={colors?.[index]}
          flavour={flavours?.[index]}
          height={height}
          key={`${flavours?.[index]}_${index}`}
          marginLeft={index === 1 && (margins[size] || margins.default)}
          normal={normal}
          position={index === 0 && "relative"}
          ref={refs?.[index]}
          round={round}
          size={size}
          width={{ min: minWidths[size] || minWidths.default }}
          {...rest}>
          {texts?.[index] || "-"}
        </Pill>
      )
    })}
  </Flex>
)

export default MasterCard
