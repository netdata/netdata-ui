import React, { useCallback, useEffect, useRef, useState } from "react"
import Drop from "@/components/drops/drop"
import Container from "@/components/drops/container"
import dropAlignMap from "@/components/drops/mixins/dropAlignMap"

const selector = "[data-overflow-tooltip]"

const getTarget = (container, origin, includeDescendant = false) => {
  if (!(origin instanceof Element)) return null

  const closest = origin.closest(selector)
  if (closest && container.contains(closest)) return closest

  if (!includeDescendant) return null
  const nested = origin.querySelector(selector)
  return nested && container.contains(nested) ? nested : null
}

const isOverflowing = target =>
  target.scrollWidth > target.clientWidth || target.scrollHeight > target.clientHeight

const OverflowTooltip = ({ containerRef, options }) => {
  const { align = "bottom", delay = 0, renderContent, zIndex = 80 } = options
  const [active, setActive] = useState(null)
  const activeRef = useRef(null)
  const pendingTargetRef = useRef(null)
  const timeoutRef = useRef()

  const clearPending = useCallback(() => {
    if (timeoutRef.current === undefined) return
    clearTimeout(timeoutRef.current)
    timeoutRef.current = undefined
    pendingTargetRef.current = null
  }, [])

  const close = useCallback(() => {
    clearPending()
    if (!activeRef.current) return
    activeRef.current = null
    setActive(null)
  }, [clearPending])

  const open = useCallback(
    (target, immediate = false) => {
      if (activeRef.current?.target === target) return
      if (!immediate && pendingTargetRef.current === target) return
      clearPending()
      if (!target || !isOverflowing(target)) {
        close()
        return
      }

      const content = target.dataset.overflowTooltip
      if (!content) {
        close()
        return
      }

      const activate = () => {
        timeoutRef.current = undefined
        pendingTargetRef.current = null
        if (!target.isConnected || !isOverflowing(target)) return
        if (activeRef.current?.target === target && activeRef.current.content === content) return

        const next = { content, target }
        activeRef.current = next
        setActive(next)
      }

      if (delay && !immediate) {
        if (activeRef.current?.target !== target) close()
        pendingTargetRef.current = target
        timeoutRef.current = setTimeout(activate, delay)
      } else {
        activate()
      }
    },
    [clearPending, close, delay]
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const onMouseOver = event => open(getTarget(container, event.target))
    const onMouseOut = event => {
      const target = getTarget(container, event.target)
      if (target?.contains(event.relatedTarget)) return
      close()
    }
    const onFocusIn = event => open(getTarget(container, event.target, true), true)
    const onFocusOut = event => {
      const target = getTarget(container, event.target, true)
      if (target?.contains(event.relatedTarget)) return
      close()
    }

    container.addEventListener("mouseover", onMouseOver)
    container.addEventListener("mouseout", onMouseOut)
    container.addEventListener("focusin", onFocusIn)
    container.addEventListener("focusout", onFocusOut)
    container.addEventListener("scroll", close, { passive: true })

    return () => {
      clearPending()
      container.removeEventListener("mouseover", onMouseOver)
      container.removeEventListener("mouseout", onMouseOut)
      container.removeEventListener("focusin", onFocusIn)
      container.removeEventListener("focusout", onFocusOut)
      container.removeEventListener("scroll", close)
    }
  }, [clearPending, close, containerRef, open])

  if (!active?.target.isConnected) return null

  return (
    <Drop
      target={active.target}
      align={dropAlignMap[align]}
      stretch={false}
      zIndex={zIndex}
      onEsc={close}
      noEvents
    >
      {renderContent ? (
        renderContent(active.content)
      ) : (
        <Container align={align}>{active.content}</Container>
      )}
    </Drop>
  )
}

export default OverflowTooltip
