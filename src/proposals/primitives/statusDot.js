// Proposed StatusDot: the Pill dot (src/components/pill/dot.js) usable on its own.
import React from "react"
import styled, { css, keyframes } from "styled-components"
import Box from "@/components/templates/box"
import { getColor } from "@/theme"

// Diameters in px mapped to 4px sub-units for the Box width/height props.
export const dotSizes = { 6: 1.5, 7: 1.75, 8: 2, 10: 2.5 }

const inkOf = ({ color, theme }) => getColor(color)({ theme })

const DotBase = styled(Box).attrs({ as: "span" })`
  position: relative;
  display: inline-block;
  flex: none;
  vertical-align: middle;
  border-radius: 50%;
`

const FilledDot = styled(DotBase)`
  background-color: ${inkOf};
`

const HollowDot = styled(DotBase)`
  border: 1.5px solid ${inkOf};
`

const ripple = keyframes`
  from { transform: scale(1); opacity: 0.45; }
  to { transform: scale(2.4); opacity: 0; }
`

const pulseRing = css`
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background-color: ${inkOf};
    animation: ${ripple} 1.6s ease-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
      opacity: 0;
    }
  }
`

const PulsingFilledDot = styled(FilledDot)`
  ${pulseRing}
`

const PulsingHollowDot = styled(HollowDot)`
  ${pulseRing}
`

const pick = (hollow, pulse) => {
  if (pulse) return hollow ? PulsingHollowDot : PulsingFilledDot
  return hollow ? HollowDot : FilledDot
}

// Decorative by default; pass aria-label when the dot is the only carrier of the status.
const StatusDot = ({ color = "text", size = 7, hollow = false, pulse = false, ...rest }) => {
  const Dot = pick(hollow, pulse)
  const side = dotSizes[size] || dotSizes[7]
  const label = rest["aria-label"]

  return (
    <Dot
      color={color}
      width={side}
      height={side}
      {...(label ? { role: "img" } : { "aria-hidden": "true" })}
      {...rest}
    />
  )
}

export default StatusDot
