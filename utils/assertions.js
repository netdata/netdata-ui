export function isFunction(value) {
  return typeof value === "function"
}

export function isArray(value) {
  return Array.isArray(value)
}

export function isObject(value) {
  const type = typeof value
  return value != null && (type === "object" || type === "function") && !isArray(value)
}

export function isEmptyObject(value) {
  return isObject(value) && Object.keys(value).length === 0
}
