import styled, { css } from "styled-components"
import { getColor, getSizeBy } from "@/theme"

const getFillPercent = ({ max = 100, min = 0, value = 0 }) => {
  const span = max - min
  if (!span) return 0
  return ((value - min) * 100) / span
}

const thumb = css`
  box-sizing: border-box;
  width: ${getSizeBy(1.5)};
  height: ${getSizeBy(1.5)};
  border-radius: 50%;
  border: ${getSizeBy(0.25)} solid ${getColor("primary")};
  background: ${getColor("mainBackground")};
  cursor: pointer;
  transition:
    border-color 120ms ease-out,
    background-color 120ms ease-out;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const thumbHover = css`
  border-color: ${getColor("primaryHover")};
`

const thumbActive = css`
  background: ${getColor("primary")};
`

const thumbFocus = css`
  box-shadow:
    0 0 0 ${getSizeBy(0.25)} ${getColor("mainBackground")},
    0 0 0 ${getSizeBy(0.5)} ${getColor("primary")};
`

export const InputRange = styled.input.attrs({ type: "range" })`
  -webkit-appearance: none;
  appearance: none;
  height: ${getSizeBy(0.5)};
  border-radius: ${getSizeBy(0.25)};
  /* neutralHighlight matches border in light and sits one surface step above it in dark. */
  background-color: ${getColor("neutralHighlight")};
  background-image: linear-gradient(${getColor("primary")}, ${getColor("primary")});
  background-repeat: no-repeat;
  background-size: ${props => `${getFillPercent(props)}% 100%`};
  cursor: pointer;
  width: 100%;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    ${thumb}
  }

  &::-moz-range-thumb {
    ${thumb}
  }

  /* The element background already paints the fill; the Firefox track must stay transparent over it. */
  &::-moz-range-track {
    height: ${getSizeBy(0.5)};
    background: transparent;
  }

  &::-moz-range-progress {
    height: ${getSizeBy(0.5)};
    border-radius: ${getSizeBy(0.25)};
    background: ${getColor("primary")};
  }

  &:hover::-webkit-slider-thumb {
    ${thumbHover}
  }

  &:hover::-moz-range-thumb {
    ${thumbHover}
  }

  &:active::-webkit-slider-thumb {
    ${thumbActive}
  }

  &:active::-moz-range-thumb {
    ${thumbActive}
  }

  &:focus-visible {
    outline: none;
  }

  &:focus-visible::-webkit-slider-thumb {
    ${thumbFocus}
  }

  &:focus-visible::-moz-range-thumb {
    ${thumbFocus}
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`
