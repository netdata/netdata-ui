/*eslint-disable */
export const readmeCleanup = (text: string): string =>
  text
    .replace('module.exports = "', "")
    .replace(/\\n/g, "\n")
    .replace(/";$/, "")
/* eslint-enable */
