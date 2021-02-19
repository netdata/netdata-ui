import { useCallback, useState, useLayoutEffect } from "react"

export default (ref, childrenRef, deps) => {
  const [arrowLeft, setArrowLeft] = useState(false)
  const [arrowRight, setArrowRight] = useState(false)

  const onScroll = useCallback(() => {
    if (!ref.current || !childrenRef.current) return
    const container = ref.current
    const tabs = childrenRef.current
    const [firstTab] = tabs
    const lastTab = tabs[tabs.length - 1]

    const scroll = container.scrollLeft
    const { width } = container.getBoundingClientRect()
    const { left } = lastTab.getBoundingClientRect()
    const { width: firstTabWidth } = firstTab.getBoundingClientRect()

    if (left > scroll) setArrowRight(true)
    if (left < scroll || left < width) setArrowRight(false)

    if (scroll > 0) setArrowLeft(true)
    if (scroll === 0) setArrowLeft(false)
  }, [])

  useLayoutEffect(() => {
    if (!ref.current || !childrenRef.current.length) return
    const container = ref.current
    onScroll()
    container.addEventListener("scroll", onScroll)
    return () => container.removeEventListener("scroll", onScroll)
  }, deps)

  return [false, false, setArrowRight]
}
