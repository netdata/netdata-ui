import styled from "styled-components"
import backdropBlur from "@/components/templates/layer/mixins/backdropBlur"
import { scrimColor } from "@/components/templates/layer/mixins/elevation"
import background from "@/components/templates/mixins/background"

const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ zIndex }) => zIndex || "35"};
  pointer-events: none;
  outline: none;
`

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: all;
  background-color: ${scrimColor};
  ${background};
  ${backdropBlur};
`

const BackdropContainer = ({ children, backdropContainerProps, backdropProps, onClick }) => (
  <Container data-testid="layer-backdropContainer" {...backdropContainerProps}>
    <Backdrop data-testid="layer-backdrop" {...backdropProps} onClick={onClick} />
    {children}
  </Container>
)

export default BackdropContainer
