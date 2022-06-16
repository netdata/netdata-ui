import { useMemo } from "react"
import useColor from "src/hooks/use-color"

const border = ({ borderSideColor, borderTopColor, showBorderLeft }) => ({
  borderRight: `1px solid ${borderSideColor}`,
  borderTop: `3px solid ${borderTopColor}`,
  ...(showBorderLeft ? { borderLeft: `1px solid ${borderSideColor}` } : {}),
})

const useStyleTabs = ({ active = false, showBorderLeft = false }) => {
  const pickColor = useColor()
  const borderSideColor = pickColor("borderSecondary")
  const borderTopColor = active ? pickColor("primary") : "transparent"

  const rootStyles = useMemo(() => {
    return {
      cursor: "pointer",
      gap: 1,
      alignItems: "center",
      justifyContent: "start",
      position: "relative",
      padding: [2, 3],
      background: active ? "mainBackground" : "topBarBg",
      zIndex: active ? 2 : 1,
      height: 8,
      sx: { ...border({ borderSideColor, borderTopColor, showBorderLeft }) },
    }
  }, [borderTopColor, borderSideColor, active])

  return { rootStyles }
}

export default useStyleTabs
