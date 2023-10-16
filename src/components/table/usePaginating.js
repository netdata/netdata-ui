import { useCallback, useEffect, useState, useRef } from "react"

const noop = () => {}
const defaultPaginationOptions = { pageIndex: 0, pageSize: 0 }

export default (paginationOptions = defaultPaginationOptions, onChange = noop) => {
  const [pagination, setPagination] = useState(() => paginationOptions)
  const initialSetRef = useRef(false)

  useEffect(() => {
    if (pagination === paginationOptions) return

    initialSetRef.current = true
    setPagination(paginationOptions)
  }, [paginationOptions])

  const onPaginationChange = useCallback(value => {
    onChange(value)
    setPagination(value)
  }, [])

  return [pagination, onPaginationChange]
}
