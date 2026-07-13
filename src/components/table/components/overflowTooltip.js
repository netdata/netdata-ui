import React, { useCallback, useEffect, useRef, useState } from "react"
import Drop from "@/components/drops/drop"
import Container from "@/components/drops/container"
import dropAlignMap from "@/components/drops/mixins/dropAlignMap"

export const overflowTooltipAttribute = "data-overflow-tooltip"

const defaultSelector = `[${overflowTooltipAttribute}]`
const defaultGetContent = target => target.getAttribute(overflowTooltipAttribute)
const targetConnectivityCheckIntervalMs = 100

const getTarget = (container, origin, selector, includeDescendant = false) => {
  if (!(origin instanceof Element)) return null

  const closest = origin.closest(selector)
  if (closest && container.contains(closest)) return closest

  if (!includeDescendant) return null
  const nested = origin.querySelector(selector)
  return nested && container.contains(nested) ? nested : null
}

const defaultIsOverflowing = target =>
  target.scrollWidth > target.clientWidth || target.scrollHeight > target.clientHeight

const OverflowTooltip = ({ containerRef, options = {} }) => {
  const {
    align = "bottom",
    closeOnWindowScroll = false,
    delay = 0,
    getContent = defaultGetContent,
    isOverflowing = defaultIsOverflowing,
    renderContent,
    selector = defaultSelector,
    zIndex = 80,
  } = options
  const [active, setActive] = useState(null)
  const [pending, setPending] = useState(false)
  const activeRef = useRef(null)
  const pendingTargetRef = useRef(null)
  const timeoutRef = useRef()

  const clearPending = useCallback(() => {
    if (timeoutRef.current === undefined) return
    clearTimeout(timeoutRef.current)
    timeoutRef.current = undefined
    pendingTargetRef.current = null
    setPending(false)
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

      const content = getContent(target)
      if (!content) {
        close()
        return
      }

      const activate = () => {
        timeoutRef.current = undefined
        pendingTargetRef.current = null
        setPending(false)
        const currentContent = getContent(target)
        if (!target.isConnected || !currentContent || !isOverflowing(target)) return
        if (activeRef.current?.target === target && activeRef.current.content === currentContent)
          return

        const next = { content: currentContent, target }
        activeRef.current = next
        setActive(next)
      }

      if (delay && !immediate) {
        if (activeRef.current?.target !== target) close()
        pendingTargetRef.current = target
        timeoutRef.current = setTimeout(activate, delay)
        setPending(true)
      } else {
        activate()
      }
    },
    [clearPending, close, delay, getContent, isOverflowing]
  )

  const openRef = useRef()
  openRef.current = open

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const onMouseOver = event => openRef.current(getTarget(container, event.target, selector))
    const onMouseOut = event => {
      const target = getTarget(container, event.target, selector)
      if (target?.contains(event.relatedTarget)) return
      close()
    }
    const onFocusIn = event =>
      openRef.current(getTarget(container, event.target, selector, true), true)
    const onFocusOut = event => {
      const target = getTarget(container, event.target, selector, true)
      if (target?.contains(event.relatedTarget)) return
      close()
    }

    container.addEventListener("mouseover", onMouseOver)
    container.addEventListener("mouseout", onMouseOut)
    container.addEventListener("focusin", onFocusIn)
    container.addEventListener("focusout", onFocusOut)
    container.addEventListener("scroll", close, { capture: true, passive: true })

    return () => {
      clearPending()
      container.removeEventListener("mouseover", onMouseOver)
      container.removeEventListener("mouseout", onMouseOut)
      container.removeEventListener("focusin", onFocusIn)
      container.removeEventListener("focusout", onFocusOut)
      container.removeEventListener("scroll", close, true)
    }
  }, [clearPending, close, containerRef, selector])

  useEffect(() => {
    if (!active && !pending) return undefined

    const interval = active
      ? setInterval(() => {
          if (!active.target.isConnected) close()
        }, targetConnectivityCheckIntervalMs)
      : undefined

    window.addEventListener("resize", close, { passive: true })
    if (closeOnWindowScroll) {
      window.addEventListener("scroll", close, { capture: true, passive: true })
    }

    return () => {
      if (interval !== undefined) clearInterval(interval)
      window.removeEventListener("resize", close)
      if (closeOnWindowScroll) window.removeEventListener("scroll", close, true)
    }
  }, [active, close, closeOnWindowScroll, pending])

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
