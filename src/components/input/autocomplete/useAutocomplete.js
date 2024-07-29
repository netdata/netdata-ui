import { useCallback } from "react"
import { useState, useEffect } from "react"

const useAutocomplete = ({ value, onInputChange, autocompleteProps = {} }) => {
  const [autocompleteOpen, setAutocompleteOpen] = useState()
  const { suggestions = [] } = autocompleteProps || {}
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions)

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
    if (suggestions.length && !!value) {
      const filtered = suggestions.filter(({ label }) => label.includes(value))
      setFilteredSuggestions(filtered)
      setAutocompleteOpen(!!filtered.length)
    }
  }, [value, suggestions, setAutocompleteOpen, setFilteredSuggestions])

  return { autocompleteOpen, close, filteredSuggestions, onItemClick }
}

export default useAutocomplete
