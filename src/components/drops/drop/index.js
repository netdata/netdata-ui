import React, { forwardRef, useEffect } from "react"
import ReactDOM from "react-dom"
import useDropElement from "src/hooks/use-drop-element"
import useKeyboardEsc from "src/hooks/use-keyboard-esc"
import useOutsideClick from "src/hooks/use-outside-click"
import useForwardRef from "src/hooks/use-forward-ref"
import useDimensionChange from "./useDimensionChange"
import useMakeUpdatePosition from "./useMakeUpdatePosition"
import Container from "./container"
import BackdropContainer from "src/components/templates/layer/backdropContainer"

const defaultAlign = { top: "bottom", left: "left" }

const Drop = forwardRef(
  (
    {
      backdrop = false,
      target,
      align = defaultAlign,
      stretch = "width",
      onClickOutside,
      onEsc,
      children,
      canHideTarget = true,
      backdropProps,
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

    useOutsideClick(ref, onClickOutside, target)
    useKeyboardEsc(onEsc)

    const el = useDropElement()

    return ReactDOM.createPortal(
      backdrop ? (
        <BackdropContainer backdropProps={backdropProps}>
          <Container ref={setRef} width={{ max: "100%" }} column data-testid="drop" {...rest}>
            {children}
          </Container>
        </BackdropContainer>
      ) : (
        <Container ref={setRef} width={{ max: "100%" }} column data-testid="drop" {...rest}>
          {children}
        </Container>
      ),
      el
    )
  }
)

export default Drop
