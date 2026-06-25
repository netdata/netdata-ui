import React, { useRef } from "react"
import { flushSync } from "react-dom"
import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { useTableState } from "../../provider"

const rerenderSelector = state => state.columnSizingInfo?.deltaPercentage

const AUTO_FIT_PADDING = 8

const AUTO_FIT_MAX_RATIO = 0.5

export const Handler = styled(Flex).attrs({
  position: "absolute",
  top: "2px",
  right: 0,
  bottom: "2px",
})``

const measureNaturalWidth = (nodes, forceNowrap) => {
  const probe = document.createElement("div")
  probe.style.cssText =
    "position:absolute;visibility:hidden;left:-9999px;top:0;width:auto;white-space:nowrap;"
  document.body.appendChild(probe)

  let max = 0
  nodes.forEach(node => {
    const clone = node.cloneNode(true)
    clone.style.width = "auto"
    clone.style.maxWidth = "none"
    if (forceNowrap) {
      clone.style.whiteSpace = "nowrap"
      clone.style.flexWrap = "nowrap"
      clone.querySelectorAll("*").forEach(el => {
        el.style.whiteSpace = "nowrap"
        el.style.flexWrap = "nowrap"
      })
    }
    probe.appendChild(clone)
    max = Math.max(max, clone.scrollWidth)
    probe.removeChild(clone)
  })

  document.body.removeChild(probe)
  return max
}

const ResizeHandler = ({ header, table, testPrefix = "" }) => {
  useTableState(rerenderSelector)
  const ref = useRef()
  if (!header.column.getCanResize()) return null

  const { column } = header

  const resizingProps = column.getIsResizing()
    ? { transform: `translateX(${table.getState().columnSizingInfo.deltaOffset}px)` }
    : {}

  const handleResizeStart = e => {
    if (column.columnDef.fullWidth && table.getState().columnSizing?.[column.id] == null) {
      const width = ref.current?.parentElement?.getBoundingClientRect().width
      if (width) flushSync(() => table.setColumnSizing(old => ({ ...old, [column.id]: width })))
    }
    header.getResizeHandler()(e)
  }

  const handleAutoFit = () => {
    const headerCell = ref.current?.parentElement
    if (!headerCell) return

    const container = headerCell.closest(`[data-testid="netdata-table${testPrefix}"]`)
    const cells = container
      ? [...container.querySelectorAll('[data-testid^="netdata-table-cell-"]')].filter(
          el => el.getAttribute("data-testid") === `netdata-table-cell-${column.id}${testPrefix}`
        )
      : []

    const max = measureNaturalWidth([headerCell, ...cells], !column.columnDef.fullWidth)
    if (!max) return

    const limit = container ? container.clientWidth * AUTO_FIT_MAX_RATIO : Infinity
    const width = Math.min(Math.ceil(max) + AUTO_FIT_PADDING, limit)
    table.setColumnSizing(old => ({ ...old, [column.id]: width }))
  }

  return (
    <Handler
      ref={ref}
      border={{ side: "right", size: "1px", color: "borderSecondary" }}
      _hover={{ border: { side: "right", size: "3px", color: "resizerLine" } }}
      _active={{ border: { side: "right", size: "3px", color: "resizerLine" } }}
      width="8px"
      sx={{
        userSelect: "none",
        touchAction: "none",
        cursor: "col-resize",
        ...resizingProps,
      }}
      onMouseDown={handleResizeStart}
      onTouchStart={handleResizeStart}
      onDoubleClick={handleAutoFit}
    />
  )
}

export default ResizeHandler
