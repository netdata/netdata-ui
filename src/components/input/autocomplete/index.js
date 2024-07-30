import React, { forwardRef, useCallback, useState } from "react"
import { StyledOptionsContainer } from "./styled"
import Dropdown from "@/components/drops/menu/dropdown"
import DropdownItem from "@/components/drops/menu/dropdownItem"
import useOutsideClick from "@/hooks/useOutsideClick"
import useAutocomplete from "./useAutocomplete"

const Autocomplete = forwardRef(({ value, autocompleteProps, onInputChange, onEsc }, ref) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const { autocompleteOpen, close, filteredSuggestions, onItemClick } = useAutocomplete({
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
        onItemClick(filteredSuggestions[activeIndex]?.value)
        onEsc()
      }
    },
    [activeIndex, filteredSuggestions, onItemClick, onEsc, close]
  )

  useOutsideClick(ref, close, ref?.current)

  return (
    autocompleteOpen && (
      <StyledOptionsContainer>
        <Dropdown
          ref={ref}
          items={filteredSuggestions}
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
