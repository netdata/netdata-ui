import { useCallback, useEffect, useState } from "react"

const noop = () => {}
const emptyObj = {}

export default (defaultColumnVisibility = emptyObj, onChange = noop) => {
  const [columnVisibility, setColumnVisibility] = useState(() => defaultColumnVisibility)

  useEffect(() => {
    if (columnVisibility === defaultColumnVisibility) return

    setColumnVisibility(defaultColumnVisibility)
  }, [defaultColumnVisibility])

  const onVisibilityChange = useCallback(value => {
    onChange(value)
    setColumnVisibility(value)
  }, [])

  return [columnVisibility, onVisibilityChange]
}
