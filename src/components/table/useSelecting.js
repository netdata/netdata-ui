import { useCallback, useEffect, useState, useRef } from "react"

const noop = () => {}
const emptyObj = {}

export default (defaultRowSelection = emptyObj, onChange = noop) => {
  const [rowSelection, setRowSelection] = useState(() => defaultRowSelection)
  const initialSetRef = useRef(false)

  useEffect(() => {
    if (rowSelection === defaultRowSelection) return

    // initialSetRef.current = true
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
