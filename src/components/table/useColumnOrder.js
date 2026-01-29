import { useCallback, useEffect, useState, useRef } from "react"

const noop = () => {}
const emptyArray = []

export default (defaultColumnOrder = emptyArray, onChange = noop) => {
  const [columnOrder, setColumnOrder] = useState(() => defaultColumnOrder)
  const initialSetRef = useRef(false)

  useEffect(() => {
    if (!defaultColumnOrder || columnOrder === defaultColumnOrder) return

    initialSetRef.current = true
    setColumnOrder(defaultColumnOrder)
  }, [defaultColumnOrder])

  const onColumnOrderChange = useCallback(value => {
    const newOrder = typeof value === "function" ? value(columnOrder) : value
    onChange(newOrder)
    setColumnOrder(newOrder)
  }, [columnOrder, onChange])

  return [columnOrder, onColumnOrderChange]
}
