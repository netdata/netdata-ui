import styled from "styled-components"
import Box from "@/components/templates/box"
import InputRange from "@/components/input/range"

export const Slider = styled(Box)``

export const SliderTrack = styled(Box)`
  background-position: ${({ max, min, minValue, width }) =>
    `${(width * ((minValue - min) / (max - min)) * 100) / 100}px 100%`};
  background-color: ${({ theme }) => theme.colors.primary}40;
  background-image: linear-gradient(
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.primary}
  );
  background-repeat: no-repeat;
  background-size: ${({ max, maxValue, min, minValue }) =>
    `${((maxValue - minValue) * 100) / (max - min)}% 100%`};
  height: 2px;
  width: ${({ width }) => `${width}px` || "100%"};
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
