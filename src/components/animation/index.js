import React, { useMemo } from "react"
import styled from "styled-components"
import { Transition } from "react-transition-group"
import makeAnimations from "./makeAnimations"

const Animation = ({
  in: isVisible,
  as,
  toggle,
  speed = 200,
  timing = "",
  transformOrigin,
  mount,
  children,
  ...rest
}) => {
  const animations = useMemo(() => makeAnimations({ toggle, timing, speed, transformOrigin }), [])

  const StyledContainer = useMemo(
    () =>
      as &&
      styled(as)`
        ${props => props.transitionStyling}
      `,
    []
  )

  return (
    <Transition in={isVisible} timeout={speed} mountOnEnter={!mount} unmountOnExit={!mount}>
      {transition => {
        const transitionStyling = animations[transition]

        if (StyledContainer) {
          return (
            <StyledContainer transitionStyling={transitionStyling} {...rest}>
              {children({ transition, transitionStyling })}
            </StyledContainer>
          )
        }

        return children({ transition, transitionStyling })
      }}
    </Transition>
  )
}

export default Animation
