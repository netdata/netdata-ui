// Vertical padding is zero: height comes from the min-height ladder so every size lines up.
const paddings = {
  default: [0, 2],
  small: [0, 1.5],
  large: [0, 2.5],
}

const getPillPadding = (padding, size, tiny) => {
  if (padding) return padding
  if (tiny) return [0, 1]
  return paddings[size] || paddings.default
}

export default getPillPadding
