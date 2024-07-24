import React from "react"
import Drop from "@/components/drops/drop"
import Options from "./options"
import useAutocomplete from "./useAutocomplete"

const Autocomplete = ({ value, autocompleteProps, tagretRef }) => {
  const { autocompleteOpen, suggestions } = useAutocomplete({ value, autocompleteProps })

  return (
    autocompleteOpen &&
    tagretRef?.current && (
      <Drop
        width={60}
        target={tagretRef.current}
        align={{ top: "bottom", left: "left" }}
        animation
        background="inputBg"
        margin={[1, 0, 0]}
        round={1}
        close={() => {}}
        onClickOutside={() => {}}
        onEsc={() => {}}
      >
        <Options suggestions={suggestions} />
      </Drop>
    )
  )
}

export default Autocomplete
