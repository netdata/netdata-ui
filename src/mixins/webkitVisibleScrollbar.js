import { css } from "styled-components"
import { getColor, getRgbColor, getSizeBy } from "@/theme/utils"

const thumb = getRgbColor("controlBorder", 0.32)
const thumbHover = getColor("main")

export default css`
  @media (forced-colors: none) {
    scrollbar-width: thin;
    scrollbar-color: ${thumb} transparent;

    @supports selector(::-webkit-scrollbar) {
      scrollbar-width: auto;
      scrollbar-color: auto;

      &::-webkit-scrollbar {
        width: ${getSizeBy(1)};
        height: ${getSizeBy(1)};
      }

      &::-webkit-scrollbar-track,
      &::-webkit-scrollbar-corner {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        border: ${getSizeBy(0.25)} solid transparent;
        border-radius: ${getSizeBy(1)};
        background: ${thumb};
        background-clip: padding-box;
      }

      &::-webkit-scrollbar-thumb:hover,
      &::-webkit-scrollbar-thumb:active {
        border-width: ${getSizeBy(0.125)};
        background-color: ${thumbHover};
      }
    }
  }
`
