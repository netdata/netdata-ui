const positionMap = {
  static: "static",
  absolute: "absolute",
  fixed: "fixed",
  relative: "relative",
  sticky: "sticky",
  initial: "initial",
  inherit: "inherit",
}

export default ({ position }) => {
  return position in positionMap ? `position: ${position};` : ""
}
