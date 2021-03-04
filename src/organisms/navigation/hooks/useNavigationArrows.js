import { useCallback, useState } from "react"

export default (ref, childrenRef, children, collapsed) => {
  const [arrowLeft, setArrowLeft] = useState(false)
  const [arrowRight, setArrowRight] = useState(false)

  const onScroll = useCallback(() => {
    if (!ref.current || !childrenRef.current) return
    if (!collapsed) return

    const container = ref.current
    const tabs = childrenRef.current
    const lastTab = tabs[tabs.length - 1]

    const scroll = container.scrollLeft
    const { right: containerRight } = container.getBoundingClientRect()
    const { right: lastTabRight } = lastTab.getBoundingClientRect()

    if (lastTabRight > containerRight) setArrowRight(true)
    if (lastTabRight <= containerRight) setArrowRight(false)

    if (scroll > 0) setArrowLeft(true)
    if (scroll === 0) setArrowLeft(false)
  }, [collapsed, children])

  return [arrowLeft, arrowRight, onScroll]
}
