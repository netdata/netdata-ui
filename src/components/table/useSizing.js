import { useCallback, useLayoutEffect, useRef, useState } from "react"
import isEqual from "lodash/isEqual"

const noop = () => {}
const emptyObj = {}

export default (defaultColumnSizing = emptyObj, onChange = noop) => {
  const [columnSizing, setColumnSizing] = useState(() => defaultColumnSizing)
  const currentSizing = useRef(defaultColumnSizing)

  useLayoutEffect(() => {
    if (isEqual(currentSizing.current, defaultColumnSizing)) return

    currentSizing.current = defaultColumnSizing
    setColumnSizing(defaultColumnSizing)
  }, [defaultColumnSizing])

  const onSizingChange = useCallback(
    update => {
      const previous = currentSizing.current
      const next = typeof update === "function" ? update(previous) : update
      if (isEqual(previous, next)) return

      currentSizing.current = next
      setColumnSizing(next)
      onChange(next)
    },
    [onChange]
  )

  return [columnSizing, onSizingChange]
}
