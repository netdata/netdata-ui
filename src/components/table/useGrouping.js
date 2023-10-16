import { useCallback, useEffect, useRef, useState } from "react"

const noop = () => {}

export default (defaultGrouping = "", onChange = noop) => {
  const [grouping, setGrouping] = useState(defaultGrouping)
  const initialSetRef = useRef(false)

  useEffect(() => {
    if (grouping === defaultGrouping) return

    initialSetRef.current = true
    setGrouping(defaultGrouping)
  }, [defaultGrouping])

  const onGroupingChange = useCallback(value => {
    onChange(value)
    setGrouping(value)
  }, [])

  return [grouping, onGroupingChange]
}
