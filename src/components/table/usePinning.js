import { useCallback, useEffect, useState, useRef } from "react"

const noop = () => {}
const emptyObj = {}

export default (defaultPinning = emptyObj, onChange = noop) => {
  const [pinning, setPinning] = useState(() => defaultPinning)
  const initialSetRef = useRef(false)

  useEffect(() => {
    if (!defaultPinning || pinning === defaultPinning) return

    initialSetRef.current = true
    setPinning(defaultPinning)
  }, [defaultPinning])

  const onPin = useCallback(value => {
    onChange(value)
    setPinning(value)
  }, [])

  return [pinning, onPin]
}
