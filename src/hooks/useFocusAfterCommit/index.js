import { useCallback, useLayoutEffect, useRef } from "react"

const focusElement = element => element.focus()

const useFocusAfterCommit = (focus = focusElement) => {
  const pending = useRef(null)

  useLayoutEffect(() => {
    const resolve = pending.current
    if (!resolve) return
    pending.current = null
    const element = resolve()
    if (element) focus(element)
  })

  return useCallback(resolve => {
    pending.current = resolve
  }, [])
}

export default useFocusAfterCommit
