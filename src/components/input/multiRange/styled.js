import styled from "styled-components"
import Box from "@/components/templates/box"
import Flex from "@/components/templates/flex"
import { getColor, getSizeBy } from "@/theme"
import InputRange from "@/components/input/range"

export const Slider = styled(Box)``

export const SliderTrack = styled(Box)`
  background-position: ${({ max, min, minValue, width }) =>
    `${(width * ((minValue - min) / (max - min)) * 100) / 100}px 100%`};
  background-color: ${getColor("neutralHighlight")};
  background-image: linear-gradient(${getColor("primary")}, ${getColor("primary")});
  background-repeat: no-repeat;
  background-size: ${({ max, maxValue, min, minValue }) =>
    `${((maxValue - minValue) * 100) / (max - min)}% 100%`};
  height: ${getSizeBy(0.5)};
  border-radius: ${getSizeBy(0.25)};
  width: ${({ width }) => (width ? `${width}px` : "100%")};
`

export const Range = styled(InputRange)`
  pointer-events: none;
  position: absolute;
  height: 0;
  outline: none;
  width: 100%;

  &::-webkit-slider-thumb {
    pointer-events: all;
  }
`

export const Values = styled(Flex)`
  font-variant-numeric: tabular-nums;
`
