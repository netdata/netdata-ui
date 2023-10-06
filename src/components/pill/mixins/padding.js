const paddings = {
  default: [1, 2],
  large: [2, 3],
}

const getPillPadding = (padding, size, tiny) => {
  if (padding) return padding
  if (tiny) return [0.5, 1]
  return paddings[size] || paddings.default
}

export default getPillPadding
