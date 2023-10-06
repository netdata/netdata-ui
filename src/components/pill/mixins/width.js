const getPillWidth = (width, tiny) => {
  if (width) return width
  return tiny && "auto"
}

export default getPillWidth
