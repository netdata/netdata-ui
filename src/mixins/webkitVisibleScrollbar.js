import { css } from "styled-components"
import { getSizeBy, getRgbColor } from "@/theme/utils"

export default css`
  scrollbar-width: ${getSizeBy(1)};
  scrollbar-color: ${getRgbColor("border", 0.3)} ${getRgbColor("border", 0.1)};

  &::-webkit-scrollbar {
    width: ${getSizeBy(1)};
  }
  &::-webkit-scrollbar-track {
    border-radius: ${getSizeBy(0.5)};
    background-color: ${getRgbColor("border", 0.1)};
  }
  &::-webkit-scrollbar-thumb {
    border-radius: ${getSizeBy(1)};
    background-color: ${getRgbColor("border", 0.3)};
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${getRgbColor("border", 0.5)};
  }
  &::-webkit-scrollbar-track-piece {
    background-color: ${getRgbColor("border", 0.3)};
  }
  &::-webkit-scrollbar-corner {
    background-color: ${getRgbColor("border", 0.3)};
  }
`
