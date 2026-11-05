import { useEffect } from "react"

export default ref => {
  useEffect(() => {
    if (!ref.current) return
    const container = ref.current
    const onWheel = e => {
      container.scrollLeft = container.scrollLeft + e.deltaY * 0.1
    }

    container.addEventListener("wheel", onWheel)
    return () => container.removeEventListener("wheel", onWheel)
  }, [])
}
