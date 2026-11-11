import fs from "fs"
import path from "path"
import { composeStories, setProjectAnnotations } from "@storybook/react"
import { useTheme } from "styled-components"
import { render, cleanup } from "testUtilities"
import preview, { globalTypes } from "../.storybook/preview"

setProjectAnnotations({ ...preview, globalTypes })

// jsdom has no IntersectionObserver; an inert one lets lazy stories mount without observing anything.
beforeAll(() => {
  if (!window.IntersectionObserver)
    window.IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
})

const collect = dir =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return collect(full)
    return /\.stories\.js$/.test(entry.name) ? [full] : []
  })

const files = collect(__dirname).map(file => path.relative(__dirname, file))

// Storybook is the review surface for the UI kit, so every story must render in both themes.
// The theme travels as a story-level global; a `globals` prop on the composed story is ignored.
describe.each(files)("%s", file => {
  const module = require(`./${file}`)
  const names = Object.keys(composeStories(module))

  it.each(names.flatMap(name => [[name, "light"], [name, "dark"]]))("%s renders in %s", (name, theme) => {
    const { [name]: Story } = composeStories({
      ...module,
      [name]: { ...(typeof module[name] === "function" ? { render: module[name] } : module[name]), globals: { theme } },
    })
    const { container } = render(<Story />)
    expect(container.firstChild).not.toBeNull()
    cleanup()
  })
})

it("really renders the dark pass with the dark theme", () => {
  const Probe = () => <span data-testid="bg">{useTheme().colors.mainBackground}</span>
  const { Story } = composeStories({ default: { title: "Probe" }, Story: { render: () => <Probe />, globals: { theme: "dark" } } })
  const { getByTestId } = render(<Story />)
  expect(getByTestId("bg").textContent).toBe(require("@/theme").DarkTheme.colors.mainBackground)
})
