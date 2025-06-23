import { useCallback, useEffect, useState } from "react"

const noop = () => {}
const emptyObj = {}

export default (defaultColumnVisibility = emptyObj, onChange = noop) => {
  const [columnVisibility, setColumnVisibility] = useState(() => defaultColumnVisibility)

  useEffect(() => {
    if (columnVisibility === defaultColumnVisibility) return

    setColumnVisibility(defaultColumnVisibility)
  }, [defaultColumnVisibility])

  const onVisibilityChange = useCallback(
    getValue => {
      const newValue = getValue(columnVisibility)
      onChange(newValue)
      setColumnVisibility(newValue)
    },
    [columnVisibility]
  )

  return [columnVisibility, onVisibilityChange]
}
