const capitalizeFirstLetter = (string, capitalizeOnlyFirst) => {
  const word = capitalizeOnlyFirst ? string.toLowerCase() : string
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export default capitalizeFirstLetter
