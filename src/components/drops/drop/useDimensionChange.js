import { useEffect } from "react"
import getAncestors from "@/components/drops/mixins/getAncestors"

export default (target, callback) =>
  useEffect(() => {
    let removeScrollListeners

    const addScrollListeners = () => {
      const scrollAncestors = getAncestors(target).filter(
        node => node.scrollHeight > node.clientHeight
      )
      scrollAncestors.forEach(node =>
        node.addEventListener("scroll", callback, {
          capture: false,
          passive: true,
        })
      )
      return () => scrollAncestors.forEach(node => node.removeEventListener("scroll", callback))
    }

    removeScrollListeners = addScrollListeners()

    const onResize = () => {
      removeScrollListeners()
      removeScrollListeners = addScrollListeners()
      callback()
    }
    window.addEventListener("resize", onResize)

    return () => {
      removeScrollListeners()
      window.removeEventListener("resize", onResize)
    }
  }, [target, callback])
