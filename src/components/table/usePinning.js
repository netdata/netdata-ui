import { useCallback, useEffect, useState } from "react"

const noop = () => {}
const emptyObj = {}

export default (defaultPinning = emptyObj, onChange = noop) => {
  const [pinning, setPinning] = useState(() => defaultPinning)

  useEffect(() => {
    if (!defaultPinning || pinning === defaultPinning) return

    setPinning(defaultPinning)
  }, [defaultPinning])

  const onPin = useCallback(value => {
    onChange(value)
    setPinning(value)
  }, [])

  return [pinning, onPin]
}
