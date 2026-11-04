const pillHeights = {
  default: "20px",
  normal: "20px",
  small: "18px",
  large: "24px",
}

const getPillHeight = (height, size, tiny) => {
  if (height) return height
  if (tiny) return "14px"
  return pillHeights[size] || pillHeights.default
}

export default getPillHeight
