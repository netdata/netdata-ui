import styled, { keyframes, css } from "styled-components"
import Flex from "@/components/templates/flex"
import { floatingShadow } from "../dropdownStyles"

// A short lift reads as "appeared from the trigger" without the bounce of a scale.
const dropKeyFrames = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 2px, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`

const styledAnimation = css`
  opacity: 0;
  animation: ${dropKeyFrames} 120ms ease-out forwards;
  animation-delay: 0.01s;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
`

const Container = styled(Flex).attrs(({ zIndex = 70, ...rest }) => ({
  zIndex,
  position: "fixed",
  ...rest,
}))`
  left: -99999px;

  ${({ animation }) => animation && styledAnimation}
  ${({ hideShadow }) => !hideShadow && floatingShadow}
  ${({ noEvents }) => !!noEvents && "pointer-events: none;"}

  backface-visibility: hidden;
  perspective: 1000;
  transform: translate3d(0, 0, 0);
  will-change: left, top, transform;
`

export default Container
