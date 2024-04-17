import { useLayoutEffect, useMemo } from "react"

export default () => {
  const el = useMemo(() => {
    const div = document.createElement("div")
    document.body.append(div)
    return div
  }, [])

  useLayoutEffect(() => {
    return () => {
      try {
        document.body.removeChild(el)
      } catch (e) {
        // Do nothing
      }
    }
  }, [])

  return el
}
