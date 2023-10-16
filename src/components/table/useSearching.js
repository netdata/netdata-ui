import { useCallback, useEffect, useState, useRef } from "react"

const noop = () => {}

export default (defaultGlobalFilter = "", onChange = noop) => {
  const [globalFilter, setGlobalFilter] = useState(defaultGlobalFilter)
  const initialSetRef = useRef(false)

  useEffect(() => {
    if (globalFilter === defaultGlobalFilter) return

    initialSetRef.current = true
    setGlobalFilter(defaultGlobalFilter)
  }, [defaultGlobalFilter])

  const onGlobalFilterChange = useCallback(value => {
    onChange(value)
    setGlobalFilter(value)
  }, [])

  return [globalFilter, onGlobalFilterChange]
}
