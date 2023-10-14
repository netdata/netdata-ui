import { useCallback, useEffect, useRef, useState } from "react"

const noop = () => {}
const emptyObj = {}

export default (defaultExpanded = emptyObj, onChange = noop) => {
  const initialSetRef = useRef(false)
  const [expanded, setExpanded] = useState(() => defaultExpanded)

  useEffect(() => {
    if (initialSetRef.current || !defaultExpanded || expanded === defaultExpanded) return

    initialSetRef.current = true
    setExpanded(defaultExpanded)
  }, [defaultExpanded])

  const onExpand = useCallback(value => {
    onChange(value)
    setExpanded(value)
  }, [])

  return [expanded, onExpand]
}
