import { isFunction } from "./assertions"

export function assignRef(ref, value) {
  if (ref == null) return

  if (isFunction(ref)) {
    ref(value)
    return
  }

  try {
    ref.current = value
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`)
  }
}

export function mergeRefs(...refs) {
  return node => {
    refs.forEach(ref => assignRef(ref, node))
  }
}
