import fs from "fs"
import path from "path"

// The font CSS is resolved by consumer bundlers (jest maps it to a proxy), so the import list is the observable contract.
describe("GlobalStyles font loading", () => {
  const source = fs.readFileSync(path.join(__dirname, "global-styles.js"), "utf8")

  it.each([400, 500, 600, 700])("loads IBM Plex Sans latin weight %i once for every consumer", weight => {
    expect(source).toContain(`import "@fontsource/ibm-plex-sans/latin-${weight}.css"`)
  })
})
