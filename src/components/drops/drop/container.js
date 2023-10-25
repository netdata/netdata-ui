import styled, { keyframes, css } from "styled-components"
import Flex from "@/components/templates/flex"

const dropKeyFrames = keyframes`
  0% {
    opacity: 0.5;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`

const styledAnimation = css`
  opacity: 0;
  animation: ${dropKeyFrames} 0.1s forwards;
  animation-delay: 0.01s;
`

const Container = styled(Flex).attrs(({ zIndex = 70, ...rest }) => ({
  zIndex,
  position: "fixed",
  ...rest,
}))`
  left: -99999px;

  ${({ animation }) => animation && styledAnimation}
  ${({ hideShadow }) => !hideShadow && "box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);"}
  ${({ noEvents }) => !!noEvents && "pointer-events: none;"}

  backface-visibility: hidden;
  perspective: 1000;
  transform: translate3d(0, 0, 0);
  will-change: left, top, transform;
`

export default Container
