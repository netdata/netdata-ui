import { useMemo } from "react"
import useColor from "@/hooks/useColor"

const border = ({ borderSideColor, borderTopColor, showBorderLeft }) => ({
  borderRight: `1px solid ${borderSideColor}`,
  borderTop: `2px solid ${borderTopColor}`,
  ...(showBorderLeft ? { borderLeft: `1px solid ${borderSideColor}` } : {}),
})

const useStyleTabs = ({ active = false, showBorderLeft = false, isDragOverlay }) => {
  const pickColor = useColor()
  const borderSideColor = pickColor("border")
  const borderTopColor = active ? pickColor("primary") : "transparent"

  const rootStyles = useMemo(() => {
    return {
      cursor: "pointer",
      gap: 1,
      alignItems: "center",
      justifyContent: "start",
      position: "relative",
      padding: [1, 2],
      background: active ? "mainBackground" : "topBarBg",
      height: 8,
      sx: {
        ...border({ borderSideColor, borderTopColor, showBorderLeft }),
        ...(isDragOverlay && {
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
        }),
      },
    }
  }, [borderTopColor, borderSideColor, active])

  return { rootStyles }
}

export default useStyleTabs
