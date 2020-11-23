const topLeft = size => `border-top-left-radius: ${size}px;`
const topRight = size => `border-top-right-radius: ${size}px;`
const bottomLeft = size => `border-bottom-left-radius: ${size}px;`
const bottomRight = size => `border-bottom-right-radius: ${size}px;`

const radiusMap = {
  top: size => `
    ${topLeft(size)}
    ${topRight(size)}
  `,
  left: size => `
    ${topLeft(size)}
    ${bottomLeft(size)}
  `,
  bottom: size => `
    ${bottomLeft(size)}
    ${bottomRight(size)}
  `,
  right: size => `
    ${topRight(size)}
    ${bottomRight(size)}
  `,
  "top-left": topLeft,
  "top-right": topRight,
  "bottom-left": bottomLeft,
  "bottom-right": bottomRight,
}

const getRadius = (baseUnit, round) => {
  if (round === true) return baseUnit

  if (typeof round === "number") return baseUnit * round

  return ""
}

export default ({
  theme: {
    constants: { SIZE_SUB_UNIT: baseUnit },
  },
  round,
}) => {
  if (!round) return ""

  const value = getRadius(baseUnit, round)
  if (value) return `border-radius: ${value}px;`

  const { side, size = 1 } = round
  return side in radiusMap ? `${radiusMap[side](baseUnit * size)}` : ""
}
