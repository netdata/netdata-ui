import { useCallback, useRef } from "react"

const initialRect = {
  width: -1,
  tabRight: -1,
}

const hasChanged = (prevValues, values) => {
  if (prevValues.width === initialRect.width) return true
  if (prevValues.width === values.width && prevValues.tabRight !== values.tabRight) return true
  return prevValues.width !== values.width
}

export default (parentRef, ref, target, callback, deps) => {
  const prevValuesRef = useRef(initialRect)

  return useCallback(() => {
    if (!ref.current || !target.current.length) return

    const width = document.body.clientWidth

    const draggableTabs = ref.current
    const container = parentRef.current
    const { right: containerRight, left: containerLeft } = container.getBoundingClientRect()

    if (!prevValuesRef.current.expandedStaticWidth) {
      prevValuesRef.current.expandedStaticWidth =
        draggableTabs.getBoundingClientRect().left - containerLeft
    }

    const lastTab = target.current[target.current.length - 1]
    const { right: tabRight, width: tabWidth } = lastTab.getBoundingClientRect()

    if (!hasChanged(prevValuesRef.current, { width, tabRight })) return
    if (
      tabRight < width &&
      containerLeft +
        prevValuesRef.current.expandedStaticWidth +
        (tabRight - draggableTabs.getBoundingClientRect().left) >
        width
    )
      return

    prevValuesRef.current = {
      ...prevValuesRef.current,
      width,
      tabRight,
      containerRight,
    }

    if (tabRight >= containerRight && !prevValuesRef.current.collapse) {
      prevValuesRef.current.collapse = true
      return callback(true)
    }
    if (
      tabRight + tabWidth < containerRight &&
      (prevValuesRef.current.collapse || typeof prevValuesRef.current.collapse === "undefined")
    ) {
      prevValuesRef.current.collapse = false
      return callback(false)
    }
  }, deps)
}
