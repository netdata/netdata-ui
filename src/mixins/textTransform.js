const textTransformMap = {
  none: "none",
  capitalize: "capitalize",
  uppercase: "uppercase",
  lowercase: "lowercase",
  firstLetter: "firstLetter",
  fullWidth: "full-width",
}

const textTransform = ({ textTransform = "none" } = {}) => {
  if (textTransform === textTransformMap.firstLetter)
    return `text-transform: lowercase;
    &::first-letter {
      text-transform: uppercase;
    }
`
  return textTransform in textTransformMap
    ? `text-transform: ${textTransformMap[textTransform]};`
    : `text-transform: ${textTransformMap.none};`
}

export default textTransform
