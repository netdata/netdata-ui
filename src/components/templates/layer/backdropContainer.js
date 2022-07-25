import React from "react"
import styled from "styled-components"
import backdropBlur from "src/components/templates/layer/mixins/backdropBlur"

const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: 35;
  pointer-events: none;
  outline: none;
`

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: all;
  background-color: rgba(0, 0, 0, 0.3);
  ${backdropBlur};
}
`

const BackdropContainer = ({ children, backdropProps }) => (
  <Container data-testid="layer-backdropContainer">
    <Backdrop data-testid="layer-backdrop" {...backdropProps} />
    {children}
  </Container>
)

export default BackdropContainer
