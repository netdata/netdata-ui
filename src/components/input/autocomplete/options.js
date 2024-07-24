import React from "react"
import { StyledOption } from "./styled"

const Options = ({ suggestions = [] } = {}) => {
  return (
    <ul id="autocomplete-list" role="listbox">
      {suggestions.map(({ value, label }) => (
        <StyledOption key={value} role="option">
          {label}
        </StyledOption>
      ))}
    </ul>
  )
}

export default Options
