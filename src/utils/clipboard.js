/**
 * Copy text to clipboard with cross-browser support
 * @param {string} text - The text to copy to clipboard
 * @returns {Promise<boolean>} - Promise that resolves to true if successful
 */
export const copyToClipboard = async (text) => {
  if (!text) {
    return false
  }

  try {
    // Modern clipboard API (preferred)
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }

    // Fallback for older browsers
    const textarea = document.createElement("textarea")
    textarea.value = text
    textarea.style.position = "fixed"
    textarea.style.left = "-9999px"
    textarea.style.top = "-9999px"
    textarea.style.opacity = "0"
    textarea.style.pointerEvents = "none"
    textarea.setAttribute("readonly", "")
    textarea.setAttribute("contenteditable", "true")
    
    // Mobile-specific fixes
    textarea.style.fontSize = "16px" // Prevent zoom on iOS
    textarea.style.userSelect = "text"
    textarea.style.webkitUserSelect = "text"
    
    document.body.appendChild(textarea)
    
    // Store current focus
    const activeElement = document.activeElement
    
    textarea.focus()
    textarea.setSelectionRange(0, textarea.value.length)
    
    const success = document.execCommand("copy")
    
    // Restore focus
    if (activeElement) {
      activeElement.focus()
    }
    
    document.body.removeChild(textarea)
    
    return success
  } catch (error) {
    console.error("Failed to copy to clipboard:", error)
    return false
  }
}

export default copyToClipboard