import { useEffect } from "react"

const ESC = 27

export default onEsc =>
  useEffect(() => {
    if (!onEsc) return

    const onKeydown = event => {
      if (event.keyCode === ESC) {
        onEsc(event)
      }
    }

    document.addEventListener("keydown", onKeydown)
    return () => document.removeEventListener("keydown", onKeydown)
  }, [onEsc])
