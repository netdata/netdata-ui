import { useMemo } from "react"
import useColor from "src/hooks/use-color"

const border = ({ borderRightColor, borderTopColor, showBorderLeft }) => ({
  borderRight: `1px solid ${borderRightColor}`,
  borderTop: `3px solid ${borderTopColor}`,
  ...(showBorderLeft ? { borderLeft: `1px solid ${borderRightColor}` } : {}),
})

const useStyleTabs = ({ active = false, showBorderLeft = false }) => {
  const pickColor = useColor()
  const borderRightColor = pickColor("borderSecondary")
  const borderTopColor = active ? pickColor("primary") : "transparent"

  const rootStyles = useMemo(() => {
    return {
      cursor: "pointer",
      gap: 1,
      alignItems: "center",
      justifyContent: "start",
      position: "relative",
      padding: [2, 3],
      background: active ? "mainBackground" : "elementBackground",
      zIndex: active ? 2 : 1,
      height: 8,
      sx: { ...border({ borderRightColor, borderTopColor, showBorderLeft }) },
    }
  }, [borderTopColor, borderRightColor, active])

  return { rootStyles }
}

export default useStyleTabs
