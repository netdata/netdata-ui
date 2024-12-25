import React, { useLayoutEffect } from "react"
import ReactDOM from "react-dom"
import useDropElement from "@/hooks/useDropElement"
import useKeyboardEsc from "@/hooks/useKeyboardEsc"
import useOutsideClick from "@/hooks/useOutsideClick"
import useForwardRef from "@/hooks/useForwardRef"
import useDimensionChange from "./useDimensionChange"
import useMakeUpdatePosition from "./useMakeUpdatePosition"
import Container from "./container"
import backdropBlur from "@/components/templates/layer/mixins/backdropBlur"
import styled from "styled-components"

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: all;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 60;
  ${backdropBlur};
}
`

const defaultAlignValue = { top: "bottom", left: "left" }

const Drop = ({
  backdrop = false,
  target,
  align: defaultAlign = defaultAlignValue,
  stretch = "width",
  onClickOutside,
  onEsc,
  children,
  canHideTarget = false,
  keepHorizontal,
  dataDrop = "drop-content",
  ref: parentRef,
  ...rest
}) => {
  const [ref, setRef] = useForwardRef(parentRef)

  const updatePosition = useMakeUpdatePosition(
    target,
    ref,
    defaultAlign,
    stretch,
    canHideTarget,
    keepHorizontal
  )

  useLayoutEffect(() => {
    updatePosition()
  }, [updatePosition])

  useDimensionChange(target, updatePosition)

  useOutsideClick(ref, onClickOutside, target, backdrop, dataDrop)
  useKeyboardEsc(onEsc)

  const el = useDropElement()

  return ReactDOM.createPortal(
    backdrop ? (
      <>
        <Container
          ref={setRef}
          width={{ max: "100%" }}
          column
          data-testid="drop"
          data-drop={dataDrop}
          {...rest}
        >
          {children}
        </Container>
        <Backdrop onClick={onClickOutside} />
      </>
    ) : (
      <Container
        ref={setRef}
        width={{ max: "100%" }}
        column
        data-testid="drop"
        data-drop={dataDrop}
        {...rest}
      >
        {children}
      </Container>
    ),
    el
  )
}

export default Drop
