import { useCallback } from "react"

export const useCheckboxesList = (values, handlers) => {
  const checked = values.every(isChecked => isChecked)
  const isIndeterminate = !checked && values.includes(false) && values.includes(true)

  const switchAllCheckboxes = useCallback(() => {
    if (checked) {
      handlers.forEach(handler => handler(false))
    } else {
      handlers.forEach(handler => handler(true))
    }
  }, [checked, handlers])

  return [checked, isIndeterminate, switchAllCheckboxes]
}
