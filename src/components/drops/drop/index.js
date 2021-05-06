import React, { useEffect, forwardRef } from "react"
import ReactDOM from "react-dom"
import useDropElement from "src/hooks/use-drop-element"
import useKeyboardEsc from "src/hooks/use-keyboard-esc"
import useOutsideClick from "src/hooks/use-outside-click"
import useForwardRef from "src/hooks/use-forward-ref"
import useDimensionChange from "./useDimensionChange"
import useMakeUpdatePosition from "./useMakeUpdatePosition"
import Container from "./container"

const defaultAlign = { top: "bottom", left: "left" }

const Drop = forwardRef(
  (
    {
      target,
      align = defaultAlign,
      stretch = "width",
      onClickOutside,
      onEsc,
      children,
      canHideTarget = true,
      ...rest
    },
    parentRef
  ) => {
    const [ref, setRef] = useForwardRef(parentRef)

    const updatePosition = useMakeUpdatePosition(target, ref, align, stretch, canHideTarget)

    useEffect(() => {
      const id = requestAnimationFrame(updatePosition)
      return () => cancelAnimationFrame(id)
    }, [updatePosition])

    useDimensionChange(target, updatePosition)

    useOutsideClick(ref, onClickOutside)
    useKeyboardEsc(onEsc)

    const el = useDropElement()

    return ReactDOM.createPortal(
      <Container ref={setRef} width={{ max: "100%" }} column data-testid="drop" {...rest}>
        {children}
      </Container>,
      el
    )
  }
)

export default Drop
