import React, { useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import useOutsideClick from "./useOutsideClick"
import useKeyboardEsc from "./useKeyboardEsc"
import useDimensionChange from "./useDimensionChange"
import useMakeUpdatePosition from "./useMakeUpdatePosition"
import useDropElement from "./useDropElement"
import Container from "./container"

const defaultAlign = { top: "bottom", left: "left" }

const Drop = ({
  target,
  align = defaultAlign,
  stretch = "width",
  onClickOutside,
  onEsc,
  children,
  ...rest
}) => {
  const ref = useRef()

  const updatePosition = useMakeUpdatePosition(target, ref, align, stretch)

  useEffect(() => {
    const id = requestAnimationFrame(updatePosition)
    return () => cancelAnimationFrame(id)
  }, [updatePosition])

  useDimensionChange(target, updatePosition)

  useOutsideClick(ref, onClickOutside)
  useKeyboardEsc(onEsc)

  const el = useDropElement()

  return ReactDOM.createPortal(
    <Container ref={ref} width={{ max: "100%" }} column data-testid="drop" {...rest}>
      {children}
    </Container>,
    el
  )
}

export default Drop
