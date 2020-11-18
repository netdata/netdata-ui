export default ({ disabled }) =>
  `
  pointer-events: ${disabled ? "none" : "auto"};
  cursor: ${disabled ? "default" : "pointer"};
`
