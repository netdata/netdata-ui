import { useCallback, useEffect, useState } from "react"

const noop = () => {}

export default (defaultGrouping = "", onChange = noop) => {
  const [grouping, setGrouping] = useState(defaultGrouping)

  useEffect(() => {
    if (grouping === defaultGrouping) return

    setGrouping(defaultGrouping)
  }, [defaultGrouping])

  const onGroupingChange = useCallback(value => {
    onChange(value)
    setGrouping(value)
  }, [])

  return [grouping, onGroupingChange]
}
