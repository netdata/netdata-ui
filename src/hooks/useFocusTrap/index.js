import { useEffect } from "react"

const input = "input:not([disabled])"
const focusable = [
  "a[href]",
  "button:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",")

export const getFocusCandidates = (container, { includeHiddenInputs = false } = {}) =>
  Array.from(
    container.querySelectorAll(
      includeHiddenInputs ? `${focusable},${input}` : `${focusable},${input}:not([type='hidden'])`
    )
  )

export const trapTabFocus = (event, candidates, { active, outside = false, emptyTarget }) => {
  if (event.key !== "Tab") return
  if (!candidates.length) {
    event.preventDefault()
    emptyTarget?.focus()
    return
  }

  const first = candidates[0]
  const last = candidates[candidates.length - 1]
  const boundary = event.shiftKey ? first : last
  if (!outside && active !== boundary) return

  event.preventDefault()
  const target = event.shiftKey ? last : first
  target.focus()
}

const getFocusable = container =>
  getFocusCandidates(container, { includeHiddenInputs: true }).filter(
    element => element.getAttribute("aria-hidden") !== "true" && element.tabIndex !== -1
  )

export const useFocusTrap = (container, { restoreFocus } = {}) => {
  useEffect(() => {
    if (!container) return
    const [first] = getFocusable(container)
    const initial = first || container
    initial.focus({ preventScroll: true })

    const handleKeyDown = event => {
      if (event.key !== "Tab") return
      const active = document.activeElement
      trapTabFocus(event, getFocusable(container), { active, outside: !container.contains(active) })
    }

    document.addEventListener("keydown", handleKeyDown, true)
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true)
      restoreFocus?.current?.focus({ preventScroll: true })
    }
  }, [container, restoreFocus])
}
