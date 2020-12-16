import React, { useRef } from "react"
import ReactDOM from "react-dom"
import useDropElement from "src/components/drops/drop/useDropElement"
import useOutsideClick from "src/components/drops/drop/useOutsideClick"
import useKeyboardEsc from "src/components/drops/drop/useKeyboardEsc"
import Container from "./container"
import BackdropContainer from "./backdropContainer"

const emptyArray = []

const Layer = ({
  position = "center",
  full = false,
  backdrop = true,
  margin = emptyArray,
  onClickOutside,
  onEsc,
  borderShadow,
  children,
}) => {
  const ref = useRef()

  useOutsideClick(ref, onClickOutside)
  useKeyboardEsc(onEsc)

  const el = useDropElement()

  const content = (
    <Container
      isAbsolute={backdrop}
      ref={ref}
      full={full}
      position={position}
      margin={margin}
      borderShadow={borderShadow}
      data-testid="layer-container"
    >
      {children}
    </Container>
  )

  return ReactDOM.createPortal(
    backdrop ? <BackdropContainer>{content}</BackdropContainer> : content,
    el
  )
}

export default Layer
