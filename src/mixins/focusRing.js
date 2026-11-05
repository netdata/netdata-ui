import { css } from "styled-components"
import { getColor, getSizeBy } from "@/theme"

// Selector-agnostic ring, for controls whose visual box is a sibling of a hidden native input.
export const focusRingOutline = css`
  outline: ${getSizeBy(0.25)} solid ${getColor("primary")};
  outline-offset: ${getSizeBy(0.25)};
`

export const focusRing = css`
  &:focus {
    outline: none;
  }

  &:focus-visible {
    ${focusRingOutline}
  }
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
