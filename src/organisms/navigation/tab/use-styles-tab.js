import React, { useMemo } from "react"
import useColor from "src/hooks/use-color"

const defaultBorder = ({ borderRightColor }) => ({
  borderRight: `1px solid ${borderRightColor}`,
  borderTop: `2px solid transparent`,
})

const useStyleTabs = ({ active = false }) => {
  const pickColor = useColor()
  const rootStyles = useMemo(() => {
    return {
      gap: 1,
      alignItems: "center",
      justifyContent: "start",
      position: "relative",
      padding: [2, 4],
      background: "elementBackground",
      height: 8,
      border: defaultBorder({ active }),
      sx: { ...defaultBorder({ borderRightColor: pickColor("borderSecondary") }) },
    }
  }, [active])

  return { rootStyles }
}

export default useStyleTabs
