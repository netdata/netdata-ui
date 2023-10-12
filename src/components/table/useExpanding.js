import { useCallback, useEffect, useState } from "react"

const noop = () => {}
const emptyObj = {}

export default (defaultExpanded = emptyObj, onChange = noop) => {
  const [expanded, setExpanded] = useState(() => defaultExpanded)

  useEffect(() => {
    if (!defaultExpanded || expanded === defaultExpanded) return

    setExpanded(defaultExpanded)
  }, [defaultExpanded])

  const onExpand = useCallback(value => {
    onChange(value)
    setExpanded(value)
  }, [])

  return [expanded, onExpand]
}
