export default async text => {
  if (typeof text !== "string") {
    console.error("Pass a string to copyToClipboard")
    return false
  }

  const element = document.createElement("textarea")
  const previouslyFocusedElement = document.activeElement

  element.value = text

  // Prevent keyboard from showing on mobile
  element.setAttribute("readonly", "")

  element.style.contain = "strict"
  element.style.position = "absolute"
  element.style.left = "-9999px"
  element.style.fontSize = "12pt" // Prevent zooming on iOS

  const selection = document.getSelection()
  const originalRange = selection.rangeCount > 0 && selection.getRangeAt(0)

  document.body.append(element)
  element.select()

  // Explicit selection workaround for iOS
  element.selectionStart = 0
  element.selectionEnd = text.length

  let isSuccess = false
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(element.value)
      isSuccess = true
    } else {
      isSuccess = document.execCommand("copy")
    }
  } catch {
    /* empty */
  }

  element.remove()

  if (originalRange) {
    selection.removeAllRanges()
    selection.addRange(originalRange)
  }

  // Get the focus back on the previously focused element, if any
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus()
  }

  return isSuccess
}
