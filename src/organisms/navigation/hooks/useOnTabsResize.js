import { useCallback, useRef } from "react"

const initialRect = {
  prevContainerRight: -1,
  prevTabWidth: -1,
}

export default (ref, target, callback, deps) => {
  const prevValuesRef = useRef(initialRect)

  return useCallback(() => {
    if (!ref.current || !target.current.length) return

    const container = ref.current
    const { right: containerRight } = container.getBoundingClientRect()

    const lastTab = target.current[target.current.length - 1]
    const { right: tabRight, width: tabWidth } = lastTab.getBoundingClientRect()

    const { prevContainerRight, prevTabWidth } = prevValuesRef.current
    if (prevContainerRight === containerRight && prevTabWidth === tabWidth) return

    prevValuesRef.current = {
      prevContainerRight: containerRight,
      prevTabWidth: tabWidth,
    }

    if (tabRight >= containerRight) return callback(true)
    if (tabRight + tabWidth < containerRight) return callback(false)
  }, deps)
}
