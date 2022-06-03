import { css } from "styled-components"
import { getSizeBy, getRgbColor } from "src/theme/utils"

export const webkitVisibleScrollbar = css`
  &::-webkit-scrollbar {
    width: ${getSizeBy(1)};
  }
  &::-webkit-scrollbar-track {
    border-radius: ${getSizeBy(0.5)};
    background-color: ${getRgbColor("border", 0.2)};
  }
  &::-webkit-scrollbar-thumb {
    border-radius: ${getSizeBy(1)};
    background-color: ${getRgbColor("border", 0.6)};
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${getRgbColor("border", 0.8)};
  }
`
