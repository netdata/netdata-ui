import { useCallback, useEffect, useRef } from "react"

const getAbsoluteXPosition = (align, targetRect, dropRect) => {
  if (align.left === "left") return targetRect.left
  if (align.left === "right") return targetRect.right
  if (align.right === "right") return targetRect.right - dropRect.width
  if (align.right === "left") return targetRect.left - dropRect.width

  return targetRect.left + targetRect.width / 2 - dropRect.width / 2
}

const reverseXPosition = align => {
  if (align.left === "left") return { right: "right" }
  if (align.left === "right") return { right: "left" }
  if (align.right === "right") return { left: "left" }
  if (align.right === "left") return { left: "right" }
  return align
}

const resolveXAlign = (align, targetRect, dropRect, canHideTarget) => {
  const x = getAbsoluteXPosition(align, targetRect, dropRect)
  const minX = Math.max(0, x)
  const clampedX = Math.min(window.innerWidth - dropRect.width, minX)
  if (!canHideTarget && minX !== clampedX) return reverseXPosition(align)
  return align
}

const getXPosition = (align, targetRect, dropRect) => {
  const x = getAbsoluteXPosition(align, targetRect, dropRect)
  return Math.min(window.innerWidth - dropRect.width, Math.max(0, x))
}

const getAbsoluteYPosition = (align, targetRect, dropRect) => {
  if (align.top === "top") return targetRect.top
  if (align.top === "bottom") return targetRect.bottom
  if (align.bottom === "bottom") return targetRect.bottom - dropRect.height
  if (align.bottom === "top") {
    const y = targetRect.top - dropRect.height
    if (y < 0 && targetRect.bottom + dropRect.height < window.innerHeight) {
      return targetRect.bottom
    }
    return y
  }

  return targetRect.top + targetRect.height / 2 - dropRect.height / 2
}

const reverseYPosition = align => {
  if (align.top === "top") return { bottom: "bottom" }
  if (align.top === "bottom") return { bottom: "top" }
  if (align.bottom === "bottom") return { top: "top" }
  if (align.bottom === "top") return { top: "bottom" }
  return align
}

const resolveYAlign = (align, targetRect, dropRect, canHideTarget) => {
  const y = getAbsoluteYPosition(align, targetRect, dropRect)
  const minY = Math.max(0, y)
  const clampedY = Math.min(window.innerHeight - dropRect.height, minY)
  if (!canHideTarget && minY !== clampedY) return reverseYPosition(align)
  return align
}

const getYPosition = (align, targetRect, dropRect) => {
  const y = getAbsoluteYPosition(align, targetRect, dropRect)
  return Math.min(window.innerHeight - dropRect.height, Math.max(0, y))
}

const getWidth = (stretch, targetRect, dropRect) => {
  if (stretch === "align") return Math.min(targetRect.width, dropRect.width)
  if (stretch === "width") return Math.max(targetRect.width, dropRect.width)

  return Math.min(dropRect.width, window.innerWidth)
}

const styles = ["top", "right", "bottom", "right", "width"]

export default (target, dropRef, align, stretch, canHideTarget, keepHorizontal) => {
  const resolvedAlignRef = useRef(null)
  const alignKey = `${align.top || ""}|${align.bottom || ""}|${align.left || ""}|${align.right || ""}`

  useEffect(() => {
    resolvedAlignRef.current = null
  }, [target, alignKey, canHideTarget])

  return useCallback(() => {
    if (!dropRef.current) return

    const targetRect = target.getBoundingClientRect()
    const dropRect = dropRef.current.getBoundingClientRect()

    const width = getWidth(stretch, targetRect, dropRect)
    dropRect.width = width

    const animate = () => {
      if (!dropRef.current) return

      styles.forEach(position => (dropRef.current.style[position] = ""))

      if (!resolvedAlignRef.current) {
        resolvedAlignRef.current = {
          ...resolveXAlign(align, targetRect, dropRect, canHideTarget),
          ...resolveYAlign(align, targetRect, dropRect, canHideTarget),
        }
      }

      const resolvedAlign = resolvedAlignRef.current
      const x = getXPosition(resolvedAlign, targetRect, dropRect)
      const y = getYPosition(resolvedAlign, targetRect, dropRect)

      if (!keepHorizontal || !dropRef.current.style.left) {
        dropRef.current.style.left = `${x}px`
      }

      dropRef.current.style.top = `${y}px`
      if (stretch) {
        dropRef.current.style.width = `${width}px`
      }
    }
    requestAnimationFrame(animate)
  }, [target, alignKey, stretch, canHideTarget, keepHorizontal])
}
