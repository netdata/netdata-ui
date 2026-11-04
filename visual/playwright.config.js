const { defineConfig } = require("@playwright/test")

const port = 6200

// Baselines are only valid when produced in the pinned Playwright image (see `yarn test:visual`):
// fonts and anti-aliasing differ between macOS and Linux.
module.exports = defineConfig({
  testDir: __dirname,
  testMatch: /stories\.spec\.js$/,
  outputDir: `${__dirname}/test-results`,
  snapshotPathTemplate: `${__dirname}/__screenshots__/{arg}{ext}`,
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,
  reporter: [["list"], ["html", { outputFolder: `${__dirname}/report`, open: "never" }]],
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.001, animations: "disabled", caret: "hide" },
  },
  use: {
    baseURL: `http://localhost:${port}`,
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 1,
  },
  webServer: {
    command: `node ${__dirname}/serve.js`,
    port,
    env: { PORT: String(port) },
    reuseExistingServer: false,
  },
})
