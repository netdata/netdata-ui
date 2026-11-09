const keySteps = {
  horizontal: { ArrowLeft: -1, ArrowRight: 1 },
  vertical: { ArrowUp: -1, ArrowDown: 1 },
  both: { ArrowLeft: -1, ArrowUp: -1, ArrowRight: 1, ArrowDown: 1 },
}

export const navigationIndex = (key, index, count, { orientation, wrap }) => {
  if (!count) return null
  if (key === "Home") return 0
  if (key === "End") return count - 1
  const step = (keySteps[orientation] || keySteps.horizontal)[key]
  if (step !== -1 && step !== 1) return null
  const next = index + step
  if (wrap) return (next + count) % count
  return next < 0 || next >= count ? null : next
}

export const focusInList = (event, items, from = event.target, orientation = "vertical") => {
  const index = items.indexOf(from)
  if (index < 0 || event.defaultPrevented) return
  const next = navigationIndex(event.key, index, items.length, { orientation, wrap: false })
  if (next === null) return
  event.preventDefault()
  items[next].focus()
}
