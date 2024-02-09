import { useCallback, useEffect, useState, useRef } from "react"

const noop = () => {}
const emptyObj = {}

export default (defaultColumnSizing = emptyObj, onChange = noop) => {
  const [columnSizing, setColumnSizing] = useState(() => defaultColumnSizing)
  const initialSetRef = useRef(false)

  useEffect(() => {
    if (columnSizing === defaultColumnSizing) return

    initialSetRef.current = true
    setColumnSizing(defaultColumnSizing)
  }, [defaultColumnSizing])

  const onSizingChange = useCallback(
    getValue => {
      onChange(getValue(columnSizing))
      setColumnSizing(getValue(columnSizing))
    },
    [columnSizing]
  )

  return [columnSizing, onSizingChange]
}
