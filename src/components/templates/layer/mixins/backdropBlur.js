export default ({ backdropBlur }) => {
  if (!backdropBlur) return ""

  console.log(backdropBlur)

  if (typeof backdropBlur === "boolean") return `backdrop-filter: blur(10px);`

  console.log(typeof backdropBlur)
  return typeof backdropBlur === "number"
    ? `backdrop-filter: blur(${backdropBlur}px);`
    : `backdrop-filter: blur(${backdropBlur});`
}
