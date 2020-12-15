import { useEffect, useMemo } from "react"

export default () => {
  const el = useMemo(() => document.createElement("div"), [])

  useEffect(() => {
    document.body.append(el)
    return () => document.body.removeChild(el)
  }, [])

  return el
}
