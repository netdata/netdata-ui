export default (ref, node) => {
  if (typeof ref === "function") {
    ref(node)
  } else if (ref) {
    ref.current = node
  }
}
