import React, { useRef } from "react"
import ReactDOM from "react-dom"
import useDropElement from "@/hooks/useDropElement"
import useOutsideClick from "@/hooks/useOutsideClick"
import useKeyboardEsc from "@/hooks/useKeyboardEsc"
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
  backdropProps,
  ...rest
}) => {
  const ref = useRef()

  useOutsideClick(ref, onClickOutside, null, backdrop)
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
      {...rest}
    >
      {children}
    </Container>
  )

  return ReactDOM.createPortal(
    backdrop ? (
      <BackdropContainer backdropProps={backdropProps} {...rest} onClick={onClickOutside}>
        {content}
      </BackdropContainer>
    ) : (
      content
    ),
    el
  )
}

export default Layer
