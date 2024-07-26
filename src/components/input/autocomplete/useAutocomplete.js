import { useCallback } from "react"
import { useState, useEffect } from "react"

const useAutocomplete = ({ value, onInputChange, autocompleteProps = {} }) => {
  const [autocompleteOpen, setAutocompleteOpen] = useState()
  const { suggestions = [] } = autocompleteProps || {}

  const close = useCallback(() => setAutocompleteOpen(false), [setAutocompleteOpen])

  const onItemClick = useCallback(
    val => {
      if (typeof onInputChange == "function") {
        onInputChange({ target: { value: val } })
        close()
      }
    },
    [close, onInputChange]
  )

  useEffect(() => {
    if (suggestions.length) {
      setAutocompleteOpen(!!value.length)
    }
  }, [suggestions, value, setAutocompleteOpen])

  return { autocompleteOpen, close, suggestions, onItemClick }
}

export default useAutocomplete
