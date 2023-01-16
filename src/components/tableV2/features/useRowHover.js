import { useCallback, useState } from "react"

export default onHoverRow => {
  const [hoveredRow, setHoveredRow] = useState(null)

  const onHover = useCallback(
    id => {
      setHoveredRow(id)
      onHoverRow?.(id)
    },
    [onHoverRow]
  )

  return [hoveredRow, onHover]
}
