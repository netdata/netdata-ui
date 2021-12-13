const pillHeights = {
  default: '20px',
  large: '24px',
}

const getPillHeight = (height, size, tiny) => {
  if (height) return height
  if (tiny) return "8px"
  return pillHeights?.[size] || pillHeights.default
}

export default getPillHeight
