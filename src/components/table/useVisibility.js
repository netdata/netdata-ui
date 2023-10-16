import { useCallback, useEffect, useState, useRef } from "react"

const noop = () => {}
const emptyObj = {}

export default (defaultColumnVisibility = emptyObj, onChange = noop) => {
  const [columnVisibility, setColumnVisibility] = useState(() => defaultColumnVisibility)
  const initialSetRef = useRef(false)

  useEffect(() => {
    if (columnVisibility === defaultColumnVisibility) return

    initialSetRef.current = true
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
