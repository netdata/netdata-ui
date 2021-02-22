import { useCallback, useEffect } from "react"

export default ref => {
  const onWheel = useCallback(e => {
    const container = ref.current
    container.scrollLeft = container.scrollLeft + e.deltaY * 0.1
  })

  useEffect(() => {
    if (!ref.current) return
    const container = ref.current
    container.addEventListener("wheel", onWheel)
    return () => container.remove("wheel", onWheel)
  }, [])
}
