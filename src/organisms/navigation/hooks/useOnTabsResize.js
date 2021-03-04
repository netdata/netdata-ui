import { useCallback, useRef } from "react"

export default (ref, target, callback, deps) => {
  return useCallback(() => {
    if (!ref.current || !target.current.length) return

    const container = ref.current
    const { right: containerRight } = container.getBoundingClientRect()

    const lastTab = target.current[target.current.length - 1]
    const { right: tabRight, width: tabWidth } = lastTab.getBoundingClientRect()

    if (tabRight >= containerRight) return callback(true)
    if (tabRight + tabWidth < containerRight) return callback(false)
  }, [deps])
}
