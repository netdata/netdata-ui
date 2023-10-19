import { useEffect } from "react"
import useMountedRef from "@/hooks/useMountedRef"

export default (cb, deps) => {
  const mountedRef = useMountedRef()

  useEffect(() => {
    if (!mountedRef.current) return

    return cb()
  }, deps)
}
