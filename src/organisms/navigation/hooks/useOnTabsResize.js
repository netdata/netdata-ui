import { useCallback } from "react"

export default (ref, target, callback, deps) =>
  useCallback(() => {
    if (!ref.current || !target.current.length) return

    const container = ref.current
    const { right: containerRight } = container.getBoundingClientRect()

    const lastTab = target.current[target.current.length - 1]
    const { right: tabRight, width: tabWidth } = lastTab.getBoundingClientRect()

    if (tabRight > containerRight) callback(true)
    if (tabRight + tabWidth <= containerRight) callback(false)
  }, deps)
