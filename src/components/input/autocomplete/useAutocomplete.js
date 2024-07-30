import { useState, useEffect, useMemo, useCallback } from "react"

const useAutocomplete = ({ value, onInputChange, autocompleteProps = {} }) => {
  const [autocompleteOpen, setAutocompleteOpen] = useState()
  const { suggestions = [] } = autocompleteProps || {}
  const items = useMemo(
    () =>
      suggestions.map(suggestion => ({
        value: suggestion,
        label: suggestion,
      })),
    [suggestions]
  )
  const [filteredSuggestions, setFilteredSuggestions] = useState(items)

  const close = useCallback(() => setAutocompleteOpen(false), [setAutocompleteOpen])

  const onItemClick = useCallback(
    val => {
      if (typeof onInputChange == "function") {
        onInputChange({ target: { value: val } })
        setTimeout(() => close(), 100)
      }
    },
    [close, onInputChange]
  )

  useEffect(() => {
    if (!value) {
      close()
    } else if (items.length) {
      const filtered = items.filter(({ label }) =>
        label.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredSuggestions(filtered)
      setAutocompleteOpen(!!filtered.length)
    }
  }, [value, items, setAutocompleteOpen, setFilteredSuggestions, close])

  return { autocompleteOpen, close, filteredSuggestions, onItemClick }
}

export default useAutocomplete
