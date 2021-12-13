import React from "react"
import Pill from "../index"
import Styled from "./styled";

const margins = {
  default: "-3px",
  large: "-5px",
}

const minWidths = {
  default: "29px",
  large: "37px",
}

const MasterCard = ({
  backgrounds,
  colors,
  flavours = ["error", "warningStrong"],
  height,
  normal,
  refs,
  size,
  texts,
  ...rest
}) => (
  <Styled.MasterCard background={backgrounds?.[1]} flavour={flavours?.[1]} height={height} size={size}>
    {texts.map((text, index) => (
      <Pill
        background={backgrounds?.[index]}
        color={colors?.[index]}
        flavour={flavours?.[index]}
        height={height}
        key={`${flavours?.[index]}_${index}`}
        marginLeft={index === 1 && (margins?.[size] || margins.default)}
        normal={normal}
        position={index === 0 && "relative"}
        ref={refs?.[index]}
        size={size}
        width={{ min: minWidths?.[size] || minWidths.default }}
        {...rest}>
        {text}
      </Pill>
    ))}
  </Styled.MasterCard>
)

export default MasterCard
