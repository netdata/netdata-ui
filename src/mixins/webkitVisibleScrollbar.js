import { css } from "styled-components"
import { getSizeBy, getRgbColor } from "@/theme/utils"

const trackColor = "border"
const thumbColor = "primary"

export default css`
  scrollbar-width: ${getSizeBy(1)};
  scrollbar-color: ${getRgbColor(trackColor, 0.3)} ${getRgbColor(thumbColor, 0.1)};

  &::-webkit-scrollbar {
    width: ${getSizeBy(1)};
  }
  &::-webkit-scrollbar-track {
    border-radius: ${getSizeBy(0.5)};
    background-color: ${getRgbColor(trackColor, 0.1)};
  }
  &::-webkit-scrollbar-thumb {
    border-radius: ${getSizeBy(1)};
    background-color: ${getRgbColor(thumbColor, 0.6)};
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${getRgbColor(thumbColor, 0.9)};
  }
  &::-webkit-scrollbar-track-piece {
    background-color: ${getRgbColor(trackColor, 0.3)};
  }
  &::-webkit-scrollbar-corner {
    background-color: ${getRgbColor(trackColor, 0.3)};
  }
`
