import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { readmeCleanup } from "../../utils/readme"
import Mock from "../../src/mock"
// @ts-ignore
import readme from "./README.md"

const mockStory = storiesOf("Mock", module)

const subData = {
  readme: {
    sidebar: readmeCleanup(readme),
  },
  jest: ["mock.test.tsx"],
}

mockStory.add("Mock", () => <Mock onClick={action("clicked")} />, subData)

mockStory.add(
  "Mock2",
  () => <Mock onClick={action("clicked")} test="Some not default text" />,
  subData
)
