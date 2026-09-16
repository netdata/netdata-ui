export const dropdownBorder = { side: "all", size: "1px", type: "solid", color: "border" }

export const dropdownRound = 1

export const withDropdownDefaults = props =>
  props.background === "dropdown"
    ? {
        ...props,
        border: props.border === undefined ? dropdownBorder : props.border,
        round: props.round === undefined ? dropdownRound : props.round,
      }
    : props
