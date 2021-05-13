export const readmeCleanup = text =>
  text.replace('module.exports = "', "").replace(/\\n/g, "\n").replace(/";$/, "")
