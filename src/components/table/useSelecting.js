import { useCallback, useEffect, useState } from "react"

const noop = () => {}
const emptyObj = {}

export default (defaultRowSelection = emptyObj, onChange = noop) => {
  const [rowSelection, setRowSelection] = useState(() => defaultRowSelection)

  useEffect(() => {
    if (rowSelection === defaultRowSelection) return

    setRowSelection(defaultRowSelection)
  }, [defaultRowSelection])

  const onRowSelectionChange = useCallback(value => {
    onChange(value)
    setRowSelection(value)
  }, [])

  return [rowSelection, onRowSelectionChange]
}
