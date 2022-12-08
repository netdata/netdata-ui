import { useLayoutEffect, useMemo } from "react"

export default () => {
  const el = useMemo(() => {
    const div = document.createElement("div")
    document.body.append(div)
    return div
  }, [])

  useLayoutEffect(() => {
    return () => document.body.removeChild(el)
  }, [])

  return el
}
