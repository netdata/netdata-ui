import React, { forwardRef, useCallback, useState } from "react"
import { StyledOptionsContainer } from "./styled"
import Dropdown from "@/components/drops/menu/dropdown"
import DropdownItem from "@/components/drops/menu/dropdownItem"
import useAutocomplete from "./useAutocomplete"

const Autocomplete = forwardRef(({ value, autocompleteProps, onInputChange, onEsc }, ref) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const { autocompleteOpen, close, suggestions, onItemClick } = useAutocomplete({
    value,
    onInputChange,
    autocompleteProps,
  })

  const onKeyDown = useCallback(
    e => {
      if (e.code == "Escape") {
        onEsc()
        close()
      } else if (e.code == "Enter") {
        onItemClick(suggestions[activeIndex]?.value)
        onEsc()
        close()
      }
    },
    [activeIndex, suggestions, onItemClick, onEsc, close]
  )

  return (
    autocompleteOpen && (
      <StyledOptionsContainer>
        <Dropdown
          ref={ref}
          items={suggestions}
          Item={DropdownItem}
          onItemClick={onItemClick}
          width="100%"
          onKeyDown={onKeyDown}
          enableKeyNavigation
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </StyledOptionsContainer>
    )
  )
})

export default Autocomplete
