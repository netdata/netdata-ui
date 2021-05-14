import { css } from "styled-components"
import { getSizeBy, getRgbColor } from "src/theme/utils"

export const webkitVisibleScrollbar = css`
  &::-webkit-scrollbar {
    width: ${getSizeBy(1)};
    -webkit-appearance: none;
  }

  &::-webkit-scrollbar-track {
    border-radius: ${getSizeBy(0.5)};
  }
  &::-webkit-scrollbar-thumb {
    border-radius: ${getSizeBy(1)};
  }

  &:hover,
  &:focus {
    &::-webkit-scrollbar-track {
      background-color: ${getRgbColor("border", 0.1)};
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${getRgbColor("border", 0.2)};
    }
  }
`
