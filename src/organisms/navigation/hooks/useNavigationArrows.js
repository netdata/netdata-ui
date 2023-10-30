import { useCallback, useState } from "react"

export default (ref, target, itemsLength, collapsed) => {
  const [arrowLeft, setArrowLeft] = useState(false)
  const [arrowRight, setArrowRight] = useState(false)

  const onScroll = useCallback(() => {
    if (!ref.current || !target.current) return
    if (!collapsed) return

    const scroll = ref.current.scrollLeft
    const { right: containerRight } = ref.current.getBoundingClientRect()
    const { right: lastTabRight } = target.current.getBoundingClientRect()

    setArrowRight(lastTabRight > containerRight + 20)

    setArrowLeft(scroll > 20)
  }, [collapsed, itemsLength])

  return [arrowLeft, arrowRight, onScroll]
}
