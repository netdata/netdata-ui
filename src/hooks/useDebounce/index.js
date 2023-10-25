import { useLayoutEffect, useEffect, useRef } from "react"

export default (callback, delay, deps = []) => {
  const savedCallback = useRef(callback)

  useLayoutEffect(() => {
    savedCallback.current = callback
  }, deps)

  useEffect(() => {
    const id = setTimeout(() => savedCallback.current(), delay)

    return () => clearTimeout(id)
  }, [delay, ...deps])
}
