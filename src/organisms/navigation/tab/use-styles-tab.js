import { useMemo } from "react"
import { useTheme } from "styled-components"
import useColor from "@/hooks/useColor"
import { getSizeBy } from "@/theme/utils"

const border = ({ borderSideColor, borderTopColor, showBorderLeft }) => ({
  borderRight: `1px solid ${borderSideColor}`,
  borderTop: `2px solid ${borderTopColor}`,
  ...(showBorderLeft ? { borderLeft: `1px solid ${borderSideColor}` } : {}),
})

const useStyleTabs = ({ active = false, showBorderLeft = false, isDragOverlay, dragging }) => {
  const pickColor = useColor()
  const theme = useTheme()
  const outlineOffset = `-${getSizeBy(0.25)({ theme })}`
  const borderSideColor = pickColor("border")
  const borderTopColor = active ? pickColor("primary") : "transparent"
  const isPlaceholder = dragging && !isDragOverlay

  const rootStyles = useMemo(() => {
    return {
      cursor: "pointer",
      gap: 1,
      alignItems: "center",
      justifyContent: "start",
      position: "relative",
      padding: [1, 2],
      background: active || isDragOverlay ? "mainBackground" : "topBarBg",
      color: active ? "text" : "textLite",
      height: 8,
      sx: {
        ...border({ borderSideColor, borderTopColor, showBorderLeft }),
        transition: "color 140ms ease-out, opacity 140ms ease-out",
        "@media (prefers-reduced-motion: reduce)": { transition: "none" },
        // Hover only shifts text, so a hovered tab never reads as the active one.
        ...(!active && !isDragOverlay && { "&:hover": { color: "text" } }),
        ...(isPlaceholder && {
          opacity: 0.4,
          outline: `1px dashed ${borderSideColor}`,
          outlineOffset,
        }),
        ...(isDragOverlay && {
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
        }),
      },
    }
  }, [
    borderTopColor,
    borderSideColor,
    active,
    showBorderLeft,
    isDragOverlay,
    isPlaceholder,
    outlineOffset,
  ])

  return { rootStyles }
}

export default useStyleTabs
