import { useCallback } from "react"

type ChangeHandler = (checked: boolean) => void

type UseCheckboxesList = (
  values: boolean[],
  handlers: Array<ChangeHandler>
) => [boolean, boolean, () => void]

export const useCheckboxesList: UseCheckboxesList = (
  values: boolean[],
  handlers: Array<ChangeHandler>
) => {
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
