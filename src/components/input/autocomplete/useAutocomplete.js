import { useCallback } from "react"
import { useState, useEffect } from "react"

const useAutocomplete = ({ value, autocompleteProps = {} } = {}) => {
  const [autocompleteOpen, setAutocompleteOpen] = useState()
  const { suggestions = [] } = autocompleteProps || {}

  const onItemClick = useCallback(e => console.log(e), [])

  useEffect(() => {
    if (suggestions.length) {
      setAutocompleteOpen(!!value.length)
    }
  }, [suggestions, value, setAutocompleteOpen])

  return { autocompleteOpen, suggestions, onItemClick }
}

export default useAutocomplete
