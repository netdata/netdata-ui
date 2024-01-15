import { useState } from "react"
import useDebounce from "../useDebounce"

export default (value, delay, deps = []) => {
  const [state, setState] = useState()

  useDebounce(() => setState(value), delay, [value, ...deps])

  return state
}
