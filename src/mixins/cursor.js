const cursorMap = {
  pointer: "pointer",
  default: "default",
  grab: "grab",
  move: "move",
  none: "none",
  text: "text",
  wait: "wait",
  initial: "initial",
  inherit: "inherit",
}

export default ({ cursor }) => {
  if (!cursor) return ""
  return cursor in cursorMap ? `cursor: ${cursor};` : ""
}
