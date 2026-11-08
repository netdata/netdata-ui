import styled, { css, keyframes } from "styled-components"
import Box from "@/components/templates/box"
import { getColor, getRgbColor } from "@/theme"

const pulse = props => keyframes`
  from {
    background: ${getRgbColor("borderSecondary", 0.5)(props)};
  }
  to {
    background: ${getRgbColor("borderSecondary", 1)(props)};
  }
`

const shimmer = keyframes`
  to {
    background-position-x: 0%;
  }
`

const shapes = {
  pulse: { width: "100%", height: 3, round: true },
  shimmer: { width: 25, height: 2.5, round: 1.25 },
}

const motions = {
  pulse: css`
    animation: ${css`
        ${pulse}`} 1.5s ease-in infinite;
  `,
  shimmer: css`
    display: flex;
    background: linear-gradient(
      -45deg,
      ${getColor("border")} 40%,
      ${getColor("generic")} 50%,
      ${getColor("border")} 60%
    );
    background-size: 300%;
    background-position-x: 100%;
    animation: ${shimmer} 1s infinite linear;
  `,
}

const Skeleton = styled(Box).attrs(({ variant = "pulse", ...props }) => ({
  ...(shapes[variant] || shapes.pulse),
  variant,
  ...props,
}))`
  ${({ variant }) => motions[variant] || motions.pulse}
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export default Skeleton
