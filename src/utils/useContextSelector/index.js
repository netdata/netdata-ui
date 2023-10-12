import { useRef } from "react"
import identity from "lodash/identity"
import isEqual from "lodash/isEqual"
import { useContextSelector } from "use-context-selector"

export default (Context, select = identity) => {
  const prevRef = useRef()
  return useContextSelector(Context, state => {
    const selected = select(state)
    if (!isEqual(prevRef.current, selected)) prevRef.current = selected
    return prevRef.current
  })
}
