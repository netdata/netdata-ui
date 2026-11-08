import { css } from "styled-components"
import { getColor, getSizeBy } from "@/theme"

const ringOutline = ({ offset = 2, color = "primary", radius } = {}) => css`
  outline: ${getSizeBy(0.25)} solid ${getColor(color)};
  outline-offset: ${getSizeBy(offset / 8)};
  ${radius !== undefined &&
  css`
    border-radius: ${typeof radius === "number" ? getSizeBy(radius / 2) : radius};
  `}
`

export const focusRingOutline = ringOutline()

export const focusRingAt = options => css`
  &:focus-visible {
    ${ringOutline(options)}
  }
`

export const focusRing = css`
  &:focus {
    outline: none;
  }

  ${focusRingAt()}
`

// A 2px edge drawn inside the field (border + inset line): one clear line that overflow cannot clip.
export const fieldFocusRing = css`
  &:focus-visible {
    outline: none;
    border-color: ${getColor("primary")};
    background-color: ${getColor("elementBackground")};
    box-shadow: inset 0 0 0 1px ${getColor("primary")};
  }
`

// The same edge for a wrapper whose focusable element is an input inside it.
export const fieldFocusWithinRing = css`
  &:focus-within {
    border-color: ${getColor("primary")};
    box-shadow: inset 0 0 0 1px ${getColor("primary")};
  }
`
