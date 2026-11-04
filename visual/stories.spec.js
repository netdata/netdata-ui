const fs = require("fs")
const path = require("path")
const { test, expect } = require("@playwright/test")

const index = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../storybook-static/index.json"), "utf8")
)

// Stories that depend on live time, randomness or network opt out with the `no-visual` tag.
const stories = Object.values(index.entries).filter(
  entry => entry.type === "story" && !entry.tags?.includes("no-visual")
)

for (const story of stories) {
  for (const theme of ["light", "dark"]) {
    test(`${story.id} (${theme})`, async ({ page }) => {
      await page.goto(`/iframe.html?id=${story.id}&viewMode=story&globals=theme:${theme}`)
      await page.waitForSelector("#storybook-root > *")
      await page.evaluate(() => document.fonts.ready)
      await page.waitForLoadState("networkidle")
      await expect(page).toHaveScreenshot(`${story.id}--${theme}.png`, { fullPage: true })
    })
  }
}
