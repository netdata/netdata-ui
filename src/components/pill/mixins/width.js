const getPillWidth = (width, tiny) => {
  if (width) return width
  return tiny && "8px"
}

export default getPillWidth
