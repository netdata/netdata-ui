export default ({ backdropBlur }) => {
  if (!backdropBlur) return ""

  if (typeof backdropBlur === "boolean") return `backdrop-filter: blur(10px);`

  return typeof backdropBlur === "number"
    ? `backdrop-filter: blur(${backdropBlur}px);`
    : `backdrop-filter: blur(${backdropBlur});`
}
