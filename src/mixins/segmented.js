import { css } from "styled-components"
import { getColor, getRgbColor, getSizeBy } from "@/theme"
import { focusRingOutline } from "@/mixins/focusRing"

// One track for contained tabs (switch views) and segmented pickers (switch values).
export const segmentedTrack = css`
  display: inline-flex;
  align-items: center;
  gap: ${getSizeBy(0.25)};
  padding: ${getSizeBy(0.375)};
  border-radius: ${getSizeBy(0.5)};
  border: 1px solid ${getColor("borderSecondary")};
  background: ${getRgbColor("textLite", 0.12)};
`

export const segmentedItem = css`
  border-radius: ${getSizeBy(0.25)};
  font-weight: ${({ active }) => (active ? 600 : 500)};
  color: ${({ active }) => getColor(active ? "textFocus" : "textLite")};
  background: ${({ active }) => getColor(active ? "dropdown" : ["transparent", "full"])};
  box-shadow: ${({ active, theme }) =>
    active ? `inset 0 0 0 1px ${getColor("border")({ theme })}` : "none"};
  transition:
    color 120ms ease-out,
    background 120ms ease-out;

  &:hover {
    color: ${getColor("textFocus")};
  }

  &:focus-visible {
    ${focusRingOutline}
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`
