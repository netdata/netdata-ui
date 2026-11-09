import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { getColor, getSizeBy } from "@/theme"
import getColumnFlex from "../columnFlex"

const AUTO_FIT_PADDING = 8

const AUTO_FIT_MAX_RATIO = 0.5

const naturalWidthStyles = {
  width: "max-content",
  minWidth: "max-content",
  maxWidth: "none",
  whiteSpace: "nowrap",
  overflow: "visible",
  textOverflow: "clip",
  flexWrap: "nowrap",
  flexShrink: "0",
}

export const Handler = styled(Flex).attrs({
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
})`
  &::after {
    content: "";
    position: absolute;
    top: ${getSizeBy(1)};
    bottom: ${getSizeBy(1)};
    right: 0;
    width: 1px;
    background-color: ${props =>
      getColor(props["data-hide-divider"] ? ["transparent", "full"] : "tableBorder")(props)};
    transition:
      top 120ms ease-out,
      bottom 120ms ease-out,
      width 120ms ease-out,
      background-color 120ms ease-out;
  }

  &:hover::after,
  &:active::after {
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: ${getColor("resizerLine")};
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      transition: none;
    }
  }
`

const measureNaturalWidth = (nodes, forceNowrap) => {
  const probe = document.createElement("div")
  probe.style.cssText = [
    "position:absolute",
    "visibility:hidden",
    "pointer-events:none",
    "left:-9999px",
    "top:0",
    "width:max-content",
    "min-width:max-content",
    "max-width:none",
    "white-space:nowrap",
  ].join(";")
  document.body.appendChild(probe)

  let max = 0
  try {
    nodes.forEach(node => {
      const clone = node.cloneNode(true)
      clone.style.width = "max-content"
      clone.style.minWidth = "max-content"
      clone.style.maxWidth = "none"

      const cs = getComputedStyle(node)
      clone.style.fontFamily = cs.fontFamily
      clone.style.fontSize = cs.fontSize
      clone.style.fontWeight = cs.fontWeight
      clone.style.fontStyle = cs.fontStyle
      clone.style.letterSpacing = cs.letterSpacing

      if (forceNowrap) {
        clone.querySelectorAll("*").forEach(el => Object.assign(el.style, naturalWidthStyles))
        Object.assign(clone.style, naturalWidthStyles)
      }

      probe.appendChild(clone)
      max = Math.max(max, clone.getBoundingClientRect().width, clone.scrollWidth)
      probe.removeChild(clone)
    })
  } finally {
    document.body.removeChild(probe)
  }

  return max
}

const getResizableLeaves = header =>
  header.getLeafHeaders().filter(leaf => !leaf.subHeaders.length && leaf.column.getCanResize())

const getHeaderCells = (header, handle) => {
  const cell = handle.parentElement
  if (!header.subHeaders.length) return new Map([[header.column.id, cell]])
  return new Map(
    [...cell.querySelectorAll("[data-resize-column]")].map(child => [
      child.dataset.resizeColumn,
      child.parentElement,
    ])
  )
}

const boundedWidth = (column, width) => {
  const { minSize = 0, maxSize = Infinity } = column.columnDef
  return Math.min(maxSize, Math.max(minSize, Math.round(width * 100) / 100))
}

const ResizeHandler = ({ header, table, testPrefix = "", hideDivider }) => {
  const ref = useRef()
  const activeDrag = useRef(null)
  const [guideOffset, setGuideOffset] = useState(0)

  useEffect(() => () => activeDrag.current?.(), [])

  const { column } = header
  if (header.isPlaceholder || !column.getCanResize()) return null

  const leaves = getResizableLeaves(header)
  if (!leaves.length) return null

  const handleResizeStart = event => {
    if (activeDrag.current) return

    const isTouch = event.type === "touchstart"
    if (isTouch ? event.touches.length !== 1 : event.button !== 0) return

    const startPoint = isTouch ? event.touches[0] : event
    const startX = startPoint.clientX
    const headerCells = getHeaderCells(header, event.currentTarget)
    const targets = leaves.map(leaf => {
      const { column } = leaf
      const renderedWidth = getColumnFlex(table, column, leaf)
        ? headerCells.get(column.id)?.getBoundingClientRect().width
        : 0
      return { column, width: renderedWidth || column.getSize() }
    })
    const startWidth = targets.reduce((total, target) => total + target.width, 0)
    const direction = table.options.columnResizeDirection === "rtl" ? -1 : 1
    const ownerDocument = event.currentTarget.ownerDocument
    const ownerWindow = ownerDocument.defaultView
    const moveEvent = isTouch ? "touchmove" : "mousemove"
    const endEvent = isTouch ? "touchend" : "mouseup"

    const findFinger = touches =>
      Array.from(touches).find(touch => touch.identifier === startPoint.identifier)
    const getWidths = clientX =>
      targets.map(({ column, width }) => ({
        column,
        width,
        next: boundedWidth(column, width + (clientX - startX) * direction * (width / startWidth)),
      }))

    const cleanup = () => {
      ownerDocument.removeEventListener(moveEvent, onMove)
      ownerDocument.removeEventListener(endEvent, onEnd)
      if (isTouch) ownerDocument.removeEventListener("touchcancel", onCancel)
      ownerWindow.removeEventListener("blur", cancel)
      activeDrag.current = null
    }

    const cancel = () => {
      cleanup()
      setGuideOffset(0)
    }

    const onCancel = cancelEvent => {
      if (!cancelEvent.changedTouches.length || findFinger(cancelEvent.changedTouches)) cancel()
    }

    const onMove = move => {
      const point = isTouch ? findFinger(move.touches) : move
      if (!point) return

      if (move.cancelable) move.preventDefault()
      const offset =
        point.clientX === startX
          ? 0
          : getWidths(point.clientX).reduce((total, { width, next }) => total + next - width, 0)
      setGuideOffset(offset * direction)
    }

    const onEnd = end => {
      const point = isTouch ? findFinger(end.changedTouches) : end
      if (!point) return

      if (end.cancelable) end.preventDefault()
      cancel()
      if (point.clientX === startX) return

      const changedWidths = getWidths(point.clientX).filter(({ width, next }) => next !== width)
      if (changedWidths.length) {
        table.setColumnSizing(old => ({
          ...old,
          ...Object.fromEntries(changedWidths.map(({ column, next }) => [column.id, next])),
        }))
      }
    }

    activeDrag.current = cleanup
    ownerDocument.addEventListener(moveEvent, onMove, { passive: false })
    ownerDocument.addEventListener(endEvent, onEnd, { passive: false })
    if (isTouch) ownerDocument.addEventListener("touchcancel", onCancel)
    ownerWindow.addEventListener("blur", cancel)
  }

  const handleAutoFit = () => {
    const headerCells = getHeaderCells(header, ref.current)
    const container = ref.current.closest(`[data-testid="netdata-table${testPrefix}"]`)
    const cells = container?.querySelectorAll('[data-testid^="netdata-table-cell-"]') ?? []
    const limit = container ? container.clientWidth * AUTO_FIT_MAX_RATIO : Infinity
    const widths = leaves.flatMap(({ column }) => {
      const headerCell = headerCells.get(column.id)
      if (!headerCell) return []

      const bodyCells = Array.from(cells).filter(
        element => element.dataset.testid === `netdata-table-cell-${column.id}${testPrefix}`
      )
      const max = measureNaturalWidth([headerCell, ...bodyCells], !column.columnDef.fullWidth)
      return max
        ? [[column.id, boundedWidth(column, Math.min(Math.ceil(max) + AUTO_FIT_PADDING, limit))]]
        : []
    })

    if (widths.length) table.setColumnSizing(old => ({ ...old, ...Object.fromEntries(widths) }))
  }

  return (
    <Handler
      ref={ref}
      data-resize-column={column.id}
      data-hide-divider={hideDivider || undefined}
      data-testid={`netdata-table-header-resize-handler-${column.id}${testPrefix}`}
      width="8px"
      sx={{
        userSelect: "none",
        touchAction: "none",
        cursor: "col-resize",
        ...(guideOffset ? { transform: `translateX(${guideOffset}px)` } : {}),
      }}
      onMouseDown={handleResizeStart}
      onTouchStart={handleResizeStart}
      onDoubleClick={handleAutoFit}
    />
  )
}

export default ResizeHandler
