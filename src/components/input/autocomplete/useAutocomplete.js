import { useState, useEffect } from "react"

const useAutocomplete = ({ value, autocompleteProps = {} } = {}) => {
  const [autocompleteOpen, setAutocompleteOpen] = useState()
  const { suggestions = [] } = autocompleteProps || {}

  useEffect(() => {
    if (suggestions.length) {
      setAutocompleteOpen(!!value.length)
    }
  }, [suggestions, value, setAutocompleteOpen])

  return { autocompleteOpen, suggestions }
}

export default useAutocomplete
