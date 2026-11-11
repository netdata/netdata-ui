// Faithful copies of today's skeletons: CF SkeletonBox, anomalies Bone + Shine, configuration
// Shimmer and CH Bone. Raw px values and the CH raw hex track colours are kept on purpose, for
// comparison only. They live only in this proposal file and must not be copied into src/components.
import styled, { css, keyframes } from "styled-components"
import Box from "@/components/templates/box"
import Flex from "@/components/templates/flex"
import { getColor, getRgbColor } from "@/theme"

// CF styles/skeleton.js:13 (pulse borderSecondary 50% -> 100%, 1.5s ease-in, reduced motion off)
const cfPulse = props => keyframes`
  from { background: ${getRgbColor("borderSecondary", 0.5)(props)}; }
  to { background: ${getRgbColor("borderSecondary", 1)(props)}; }
`

export const CfSkeletonBox = styled(Box).attrs(props => ({
  width: "100%",
  height: "12px",
  round: true,
  ...props,
}))`
  animation: ${css`
      ${cfPulse}`} 1.5s ease-in infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

// CF domains/anomalies/components/skeleton.js:94 (borderSecondary + 4.8s text-12% sweep)
const anomaliesShine = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
`

const shineStyles = css`
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, ${getRgbColor("text", 0.12)}, transparent);
    transform: translateX(-100%);
    animation: ${anomaliesShine} 4.8s ease-in-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
      opacity: 0;
    }
  }
`

export const AnomaliesBone = styled(Box).attrs(props => ({
  "aria-hidden": true,
  background: "borderSecondary",
  round: true,
  position: "relative",
  overflow: "hidden",
  ...props,
}))`
  flex-shrink: 0;
  ${shineStyles}
`

// CF domains/configuration/components/virtualized/placeholder.js:21 (100x10, 5px radius,
// -45deg border/generic gradient, 1s linear, no reduced-motion handling)
export const ConfigShimmer = styled(Flex).attrs(props => ({
  width: "100px",
  height: "10px",
  round: "5px",
  ...props,
}))`
  @keyframes cfShimmer {
    to {
      background-position-x: 0%;
    }
  }

  background: linear-gradient(
    -45deg,
    ${getColor("border")} 40%,
    ${getColor("generic")} 50%,
    ${getColor("border")} 60%
  );
  background-size: 300%;
  background-position-x: 100%;
  animation: cfShimmer 1s infinite linear;
`

// CH components/skeleton/index.js:242 (themeSkeleton #E8ECEC / #1E2424, white spark at 12%, 4.8s)
const chSlide = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
`

const ChShine = styled(Box).attrs({ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 })`
  pointer-events: none;
  background: linear-gradient(90deg, transparent, #ffffff, transparent);
  opacity: 0.12;
  animation: ${chSlide} 4.8s ease-in-out infinite;
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`

const ChBoneBase = styled(Box).attrs({ position: "relative", overflow: "hidden" })`
  flex: none;
  background: ${({ theme }) => (theme.name === "Dark" ? "#1E2424" : "#E8ECEC")};
`

export const ChBone = ({ round = 1, ...rest }) => (
  <ChBoneBase round={round} {...rest}>
    <ChShine />
  </ChBoneBase>
)
