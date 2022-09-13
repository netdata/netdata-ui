const pillHeights = {
  default: "18px",
  large: "22px",
}

const getPillHeight = (height, size, tiny) => {
  if (height) return height
  if (tiny) return "8px"
  return pillHeights[size] || pillHeights.default
}

export default getPillHeight
