import { useCallback, useEffect, useState } from "react"

const noop = () => {}

export default (defaultGlobalFilter = "", onChange = noop) => {
  const [globalFilter, setGlobalFilter] = useState(defaultGlobalFilter)

  useEffect(() => {
    if (globalFilter === defaultGlobalFilter) return

    setGlobalFilter(defaultGlobalFilter)
  }, [defaultGlobalFilter])

  const onGlobalFilterChange = useCallback(value => {
    onChange(value)
    setGlobalFilter(value)
  }, [])

  return [globalFilter, onGlobalFilterChange]
}
