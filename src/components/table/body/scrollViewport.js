import { useLayoutEffect } from "react"
import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { getColor, getSizeBy } from "@/theme"
import { useTableState } from "../provider"

const ScrollViewport = styled(Flex)`
  --table-pinned-left-shadow: none;
  --table-pinned-right-shadow: none;

  &[data-can-scroll-left] {
    --table-pinned-left-shadow: block;
  }

  &[data-can-scroll-right] {
    --table-pinned-right-shadow: block;
  }

  &[data-table-suspend-pins] [data-table-pinned] {
    position: static !important;
  }

  [data-table-pinned]::after {
    content: "";
    position: absolute;
    inset-block: 0;
    width: ${getSizeBy(1)};
    pointer-events: none;
  }

  [data-table-pinned="left"]::after {
    display: var(--table-pinned-left-shadow);
    left: 100%;
    background-image: linear-gradient(to right, ${getColor("dropdownShadow")}, transparent);
  }

  [data-table-pinned="right"]::after {
    display: var(--table-pinned-right-shadow);
    right: 100%;
    background-image: linear-gradient(to left, ${getColor("dropdownShadow")}, transparent);
  }
`

const updateScrollEdges = (viewport, rtl) => {
  const maximum = viewport.scrollWidth - viewport.clientWidth
  const offset = viewport.scrollLeft + (rtl ? maximum : 0)
  viewport.toggleAttribute("data-can-scroll-left", maximum > 0 && offset > 0.5)
  viewport.toggleAttribute("data-can-scroll-right", maximum > 0 && maximum - offset > 0.5)
}

const selectTableGeometry = state => ({
  sizing: state.columnSizing,
  pinning: state.columnPinning,
  visibleColumns: state.visibleColumns,
})

export const usePinnedEdges = (viewportRef, contentRef, hasPinnedEdges) => {
  const { sizing, pinning, visibleColumns } = useTableState(selectTableGeometry)

  useLayoutEffect(() => {
    if (!hasPinnedEdges) return

    const viewport = viewportRef.current
    const rtl = getComputedStyle(viewport).direction === "rtl"
    const update = () => updateScrollEdges(viewport, rtl)
    update()

    viewport.addEventListener("scroll", update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(viewport)
    observer.observe(contentRef.current)

    return () => {
      observer.disconnect()
      viewport.removeEventListener("scroll", update)
      viewport.removeAttribute("data-can-scroll-left")
      viewport.removeAttribute("data-can-scroll-right")
    }
  }, [hasPinnedEdges, sizing, pinning, visibleColumns, viewportRef, contentRef])
}

export default ScrollViewport
