import { useCallback, useEffect, useState, useRef } from "react"

const noop = () => {}
const emptyArr = []

export default (defaultSorting = emptyArr, onChange = noop) => {
  const [sorting, setSorting] = useState(() => defaultSorting)
  const initialSetRef = useRef(false)

  useEffect(() => {
    if (sorting === defaultSorting) return

    initialSetRef.current = true
    setSorting(defaultSorting)
  }, [defaultSorting])

  const onSortingChange = useCallback(
    getValue => {
      onChange(getValue(sorting))
      setSorting(getValue(sorting))
    },
    [sorting]
  )

  return [sorting, onSortingChange]
}
