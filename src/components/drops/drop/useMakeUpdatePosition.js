import { useCallback } from "react"

const getAbsoluteXPosition = (align, targetRect, dropRect) => {
  if (align.left === "left") return targetRect.left
  if (align.left === "right") return targetRect.right
  if (align.right === "right") return targetRect.right - dropRect.width
  if (align.right === "left") return targetRect.left - dropRect.width

  return targetRect.left + targetRect.width / 2 - dropRect.width / 2
}

const getXPostition = (align, targetRect, dropRect) => {
  let x = getAbsoluteXPosition(align, targetRect, dropRect)

  x = Math.max(0, x)
  x = Math.min(window.innerWidth - dropRect.width, x)

  return x
}

const getAbsoluteYPosition = (align, targetRect, dropRect) => {
  if (align.top === "top") return targetRect.top
  if (align.top === "bottom") return targetRect.bottom
  if (align.bottom === "bottom") return targetRect.bottom - dropRect.height
  if (align.bottom === "top") return targetRect.top - dropRect.height

  return targetRect.top + targetRect.height / 2 - dropRect.height / 2
}

const getYPosition = (align, targetRect, dropRect) => {
  let y = getAbsoluteYPosition(align, targetRect, dropRect)

  y = Math.max(0, y)
  y = Math.min(window.innerHeight - dropRect.height, y)

  return y
}

const getWidth = (stretch, targetRect, dropRect) => {
  if (stretch === "align") return Math.min(targetRect.width, dropRect.width)
  if (stretch === "width") return Math.max(targetRect.width, dropRect.width)

  return Math.min(dropRect.width, window.innerWidth)
}

const styles = ["top", "right", "bottom", "right", "width"]

export default (target, dropRef, align, stretch) =>
  useCallback(() => {
    styles.forEach(position => (dropRef.current.style[position] = ""))

    const targetRect = target.getBoundingClientRect()
    const dropRect = dropRef.current.getBoundingClientRect()

    const width = getWidth(stretch, targetRect, dropRect)
    dropRect.width = width

    const x = getXPostition(align, targetRect, dropRect)
    const y = getYPosition(align, targetRect, dropRect)

    dropRef.current.style.left = `${x}px`
    dropRef.current.style.top = `${y}px`
    if (stretch) {
      dropRef.current.style.width = `${width}px`
    }
  }, [target, align, stretch])
