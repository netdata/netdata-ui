import { useLayoutEffect, useState, useCallback } from "react"
import { useDebounce } from "react-use"

export default (callback, deps) => {
  const [value, setValue] = useState()
  const [valueDebounced, setValueDebounced] = useState()

  const onResize = useCallback(() => callback(setValue), [setValue])

  useDebounce(() => setValueDebounced(value), 100, [value])

  useLayoutEffect(() => {
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [callback, ...deps])

  return [valueDebounced]
}
