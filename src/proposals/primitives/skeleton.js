// Proposed Skeleton: one calm pulse on theme colours, radius by variant, still under reduced motion.
import React from "react"
import styled, { css, keyframes } from "styled-components"
import Box from "@/components/templates/box"
import Flex from "@/components/templates/flex"
import { getRgbColor } from "@/theme"

const pulse = props => keyframes`
  from { background-color: ${getRgbColor("borderSecondary", 0.5)(props)}; }
  to { background-color: ${getRgbColor("borderSecondary", 1)(props)}; }
`

const Bone = styled(Box).attrs({ "aria-hidden": "true" })`
  flex: none;
  background-color: ${getRgbColor("borderSecondary", 1)};
  animation: ${css`
      ${pulse}`} 1.5s ease-in-out infinite alternate;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

// Box units are 4px: text line 10px, box 32px, circle 32px.
const variants = {
  text: { width: "100%", height: 2.5, round: "2px" },
  box: { width: "100%", height: 8, round: "4px" },
  circle: { width: 8, height: 8, round: "50%" },
}

const lastLineWidth = "60%"

const Skeleton = ({ variant = "box", width, height, lines = 1, ...rest }) => {
  const base = variants[variant] || variants.box
  const circleSide = width ?? height
  const size =
    variant === "circle"
      ? { width: circleSide ?? base.width, height: circleSide ?? base.height }
      : { width: width ?? base.width, height: height ?? base.height }

  if (variant !== "text" || lines <= 1) return <Bone round={base.round} {...size} {...rest} />

  return (
    <Flex column gap={1.5} width={size.width} aria-hidden="true" {...rest}>
      {Array.from({ length: lines }, (_, index) => (
        <Bone
          key={index}
          round={base.round}
          height={size.height}
          width={index === lines - 1 ? lastLineWidth : "100%"}
        />
      ))}
    </Flex>
  )
}

export default Skeleton
