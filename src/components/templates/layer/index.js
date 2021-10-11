import React, { useRef } from "react"
import ReactDOM from "react-dom"
import useDropElement from "src/hooks/use-drop-element"
import useOutsideClick from "src/hooks/use-outside-click"
import useKeyboardEsc from "src/hooks/use-keyboard-esc"
import Container from "./container"
import BackdropContainer from "./backdropContainer"

const emptyArray = []

const Layer = ({
  position = "center",
  full = false,
  backdrop = true,
  backdropBlur = false,
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
    backdrop ? <BackdropContainer backdropBlur={backdropBlur}>{content}</BackdropContainer> : content,
    el
  )
}

export default Layer
