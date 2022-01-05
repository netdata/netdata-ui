import React from "react"
import Flex from "src/components/templates/flex";
import Pill from "./index"
import { getMasterCardColor } from "./mixins/colors"
import getPillHeight from "./mixins/height";

const minWidths = {
  default: "29px",
  large: "37px",
}

const getBackground = (background, flavour) => background || getMasterCardColor(flavour)

const MasterCard = ({
  backgrounds,
  colors,
  'data-testids': dataTestids,
  flavours = ["neutralGrey", "neutralIron"],
  height,
  normal,
  onClicks,
  refs,
  round,
  size,
  texts,
  ...rest
}) => (
  <Flex
    background={getBackground(backgrounds?.[1], flavours?.[1] || "neutralIron")}
    height={getPillHeight(height, size)}
    round={round || 999}
    size={size}
  >
    {flavours.map((flavour, index) => {
      const elementFlavour = flavour || (index === 0 ? "neutralGrey" : "neutralIron")
      const background = getBackground(backgrounds?.[index], elementFlavour)

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
          onClick={onClicks?.[index]}
          position={index === 0 && "relative"}
          ref={refs?.[index]}
          round={round}
          size={size}
          width={index === 0 && { min: minWidths[size] || minWidths.default }}
          padding={index === 0 ? [1, 3] : [1, 2]}
          {...rest}>
          {texts?.[index] || "-"}
        </Pill>
      )
    })}
  </Flex>
)

export default MasterCard
