import { useEffect } from "react"

const ESC = 27
const IME = 229

export const isComposingKey = event => {
  const native = event.nativeEvent || event
  return native.isComposing || native.keyCode === IME
}

export default onEsc =>
  useEffect(() => {
    if (!onEsc) return

    const onKeydown = event => {
      if (isComposingKey(event)) return
      if (event.key === "Escape" || event.code === "Escape" || event.keyCode === ESC) {
        onEsc(event)
      }
    }

    document.addEventListener("keydown", onKeydown)
    return () => document.removeEventListener("keydown", onKeydown)
  }, [onEsc])
