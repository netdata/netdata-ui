const paddings = {
  default: [0.5, 2],
  large: [1, 2.5],
}

const getPillPadding = (padding, size, tiny) => {
  if (padding) return padding
  if (tiny) return [0.25, 0.5]
  return paddings[size] || paddings.default
}

export default getPillPadding
