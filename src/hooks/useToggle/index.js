import { useState, useCallback } from "react"

/**
 * @example
 * const [value, toggle, toggleOn, toggleOff]  = useToggle(false);
 *
 * @param {Boolean} initialValue
 */

export default (initialValue, { on, off, toggle: onToggle } = {}) => {
  const [value, setToggle] = useState(!!initialValue)
  const toggle = useCallback(
    val =>
      setToggle(oldValue => {
        const nextValue = typeof val === "boolean" ? val : !oldValue

        if (onToggle) onToggle(nextValue)
        if (on && nextValue) on()
        if (off && !nextValue) off()

        return nextValue
      }),
    [onToggle, on, off]
  )
  const toggleOn = useCallback(() => {
    setToggle(true)
    if (on) on()
  }, [on])
  const toggleOff = useCallback(() => {
    setToggle(false)
    if (off) off()
  }, [off])

  return [value, toggle, toggleOn, toggleOff]
}
