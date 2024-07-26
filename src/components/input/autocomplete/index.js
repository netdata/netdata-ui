import React from "react"
import { StyledOptionsContainer } from "./styled"
import Dropdown from "@/components/drops/menu/dropdown"
import DropdownItem from "@/components/drops/menu/dropdownItem"
import useAutocomplete from "./useAutocomplete"

const Autocomplete = ({ value, autocompleteProps, Item = DropdownItem }) => {
  const { autocompleteOpen, suggestions, onItemClick } = useAutocomplete({
    value,
    autocompleteProps,
  })

  return (
    autocompleteOpen && (
      <StyledOptionsContainer>
        <Dropdown items={suggestions} Item={Item} onItemClick={onItemClick} width="100%" />
      </StyledOptionsContainer>
    )
  )
}

export default Autocomplete
