import { css } from "styled-components"
import { getSizeBy, getRgbColor } from "src/theme/utils"

export const webkitVisibleScrollbar = css`
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
