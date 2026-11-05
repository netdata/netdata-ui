// hollow (with or without semi) keeps precedence over filled; soft is the default.
export const getPillLook = ({ filled, hollow, semi }) => {
  if (hollow) return semi ? "semi" : "hollow"
  return filled ? "filled" : "soft"
}

const textColorTypes = {
  filled: "filledText",
  hollow: "color",
  semi: "semiText",
  soft: "softText",
}

export const getTextColorType = look => textColorTypes[look]
