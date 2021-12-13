const paddings = {
  default: [1, 2],
  large: [1, 3],
}

const getPillPadding = (padding, size, tiny) => {
  if (padding) return padding;
  if (tiny) return [0];
  return paddings?.[size] || paddings.default;
}

export default getPillPadding
