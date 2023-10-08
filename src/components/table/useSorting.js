import { useCallback, useEffect, useState } from "react"

const noop = () => {}
const emptyArr = []

export default (defaultSorting = emptyArr, onChange = noop) => {
  const [sorting, setSorting] = useState(() => defaultSorting)

  useEffect(() => {
    if (sorting === defaultSorting) return

    setSorting(defaultSorting)
  }, [defaultSorting])

  const onSortingChange = useCallback(value => {
    onChange(value)
    setSorting(value)
  }, [])

  return [sorting, onSortingChange]
}
