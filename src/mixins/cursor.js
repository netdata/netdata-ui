const cursorMap = {
  pointer: "pointer",
  default: "default",
  grab: "grab",
  grabbing: "grabbing",
  move: "move",
  none: "none",
  text: "text",
  wait: "wait",
  notAllowed: "not-allowed",
  initial: "initial",
  inherit: "inherit",
}

export default ({ cursor }) => {
  if (!cursor) return ""
  return cursor in cursorMap ? `cursor: ${cursorMap[cursor]};` : ""
}
