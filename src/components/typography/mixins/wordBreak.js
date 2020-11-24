const wordBreaks = new Set(["normal", "break-all", "keep-all", "break-word"])

export default ({ wordBreak }) => wordBreaks.has(wordBreak) && `word-break: ${wordBreak};`
