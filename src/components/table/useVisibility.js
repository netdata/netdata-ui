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
      onChange(getValue(columnVisibility))
      setColumnVisibility(getValue(columnVisibility))
    },
    [columnVisibility]
  )

  return [columnVisibility, onVisibilityChange]
}
