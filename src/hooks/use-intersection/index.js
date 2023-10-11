import { useCallback, useEffect, useRef, useState } from "react"
import uuid from "@/mixins/uuid"

const roots = new Map()
const observers = {}
const totalObservers = {}
const callbacks = new Map()

const getRootId = root => {
  if (roots.has(root)) return roots.get(root)

  const id = uuid()
  roots.set(root, id)
  return id
}

const getId = ({ root, rootMargin, threshold }) => `${getRootId(root)}|${rootMargin}|${threshold}`

const intersectionCallback = entries => {
  entries.forEach(entry => {
    const { target, isIntersecting } = entry
    const cb = callbacks.get(target)
    cb?.(isIntersecting)
  })
}

const observe = (callback, element, options) => {
  const id = getId(options)

  if (!(id in observers)) {
    observers[id] = new IntersectionObserver(intersectionCallback, options)
    totalObservers[id] = 0
  }

  const observer = observers[id]
  observer.observe(element)
  callbacks.set(element, callback)
  totalObservers[id] = totalObservers[id] + 1

  return () => {
    callbacks.delete(element)
    observer.unobserve(element)
    totalObservers[id] = totalObservers[id] - 1

    if (totalObservers[id] > 0) return

    observer.disconnect()
    callbacks.delete(callback)
    delete observers[id]
    delete totalObservers[id]
  }
}

export default ({ root, rootMargin, threshold, onVisibility, defaultVisible = false }) => {
  const ref = useRef()
  const unObserveRef = useRef()
  const [visible, setVisible] = useState(defaultVisible)

  const setRef = useCallback(
    element => {
      ref.current = element
      unObserveRef.current?.()
      unObserveRef.current = null
      if (!element) return

      const options = { root, rootMargin, threshold }
      unObserveRef.current = observe(
        value => {
          if (onVisibility) onVisibility(value)
          setVisible(value)
        },
        element,
        options
      )
    },
    [root, rootMargin, threshold, onVisibility]
  )

  useEffect(
    () => () => {
      unObserveRef.current?.()
      unObserveRef.current = null
    },
    []
  )

  return [setRef, ref, visible]
}
