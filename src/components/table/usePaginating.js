import { useCallback, useEffect, useState } from "react"

const noop = () => {}
const defaultPaginationOptions = { pageIndex: 0, pageSize: 0 }

export default (paginationOptions = defaultPaginationOptions, onChange = noop) => {
  const [pagination, setPagination] = useState(() => paginationOptions)

  useEffect(() => {
    if (pagination === paginationOptions) return

    setPagination(paginationOptions)
  }, [paginationOptions])

  const onPaginationChange = useCallback(value => {
    onChange(value)
    setPagination(value)
  }, [])

  return [pagination, onPaginationChange]
}
