import { addParameters, addDecorator, configure } from "@storybook/react"
import { addReadme } from "storybook-readme"
import { withThemesProvider } from "storybook-addon-styled-component-theme"
import { setIntlConfig, withIntl } from "storybook-addon-intl"
import { MockTheme } from "../src/theme/mock/mock-theme"

setIntlConfig({
  locales: ["ru", "en"],
  defaultLocale: "en",
})

addDecorator(withIntl)

addParameters({
  options: {
    name: "Netdata UI-kit",
    isFullscreen: false,
    showNav: true,
    showPanel: true,
    panelPosition: "bottom",
    hierarchySeparator: /\/|\./,
    sidebarAnimations: true,
    enableShortcuts: true,
    isToolshown: false,
    theme: undefined,
  },
})

addDecorator(addReadme)

addDecorator(withThemesProvider([MockTheme]))

const loadStories = () => {
  const req = require.context("../src", true, /\.stories\.tsx$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
