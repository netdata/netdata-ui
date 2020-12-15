import { useState, useCallback } from "react"

/**
 * @example
 * const [value, toggle, toggleOn, toggleOff]  = useToggle(false);
 *
 * @param {Boolean} initialValue
 */

export default (initialValue = false, { on, off, toggle: onToggle } = {}) => {
  const [value, setToggle] = useState(!!initialValue)

  const toggle = useCallback(() => {
    setToggle(oldValue => {
      const nextValue = !oldValue

      if (onToggle) onToggle(nextValue)
      if (on && nextValue) on()
      if (off && !nextValue) off()

      return nextValue
    })
  }, [])

  const toggleOn = useCallback(() => {
    setToggle(true)
    if (on) on()
  }, [])

  const toggleOff = useCallback(() => {
    setToggle(false)
    if (off) off()
  }, [])

  return [value, toggle, toggleOn, toggleOff]
}
