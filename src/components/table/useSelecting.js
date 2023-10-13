import { useCallback, useEffect, useState } from "react"

const noop = () => {}
const emptyObj = {}

export default (defaultRowSelection = emptyObj, onChange = noop) => {
  const [rowSelection, setRowSelection] = useState(() => defaultRowSelection)

  useEffect(() => {
    if (rowSelection === defaultRowSelection) return

    setRowSelection(defaultRowSelection)
  }, [defaultRowSelection])

  const onRowSelectionChange = useCallback(
    getValue => {
      onChange(getValue(rowSelection))
      setRowSelection(getValue(rowSelection))
    },
    [rowSelection]
  )

  return [rowSelection, onRowSelectionChange]
}
