import { useEffect, useRef } from "react"

export default (value, distinct = false) => {
  const prevRef = useRef()

  useEffect(() => {
    prevRef.current = value
  }, [distinct ? value : ""])

  return prevRef.current
}
