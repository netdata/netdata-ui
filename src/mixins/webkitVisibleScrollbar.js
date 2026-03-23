import { css } from "styled-components"
import { getSizeBy, getRgbColor } from "@/theme/utils"

export default css`
  scrollbar-width: ${getSizeBy(1)};
  scrollbar-color: ${getRgbColor("scrollBarThumb", 0.3)} ${getRgbColor("scrollBarThumb", 0.1)};

  &::-webkit-scrollbar {
    width: ${getSizeBy(1)};
  }

  &::-webkit-scrollbar-track {
    background-color: ${getRgbColor("scrollBarTrack", 1)};
    border:1px solid ${getRgbColor("scrollBarBorder", 0.4)};
    border-radius: ${getSizeBy(1)};
  }
  &::-webkit-scrollbar-thumb {
    width: ${getSizeBy(0.5)};
    border:1px solid ${getRgbColor("scrollBarBorder", 1)};
    border-radius: ${getSizeBy(1)};
    background-color:  ${getRgbColor("scrollBarThumb", 1)}
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${getRgbColor("scrollBarThumbHover", 1)};
  }
  &::-webkit-scrollbar-track-piece {
    background-color: ${getRgbColor("scrollBarThumb", 0.3)};
  }
  &::-webkit-scrollbar-corner {
    background-color: ${getRgbColor("scrollBarThumb", 0.3)};
  }
`
