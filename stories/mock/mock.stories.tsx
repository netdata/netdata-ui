import React from "react"
import { storiesOf } from "@storybook/react"
import { readmeCleanup } from "../../utils/readme"
import Mock from "../../src/mock"
// @ts-ignore
import readme from "./README.md"

const mockStory = storiesOf("Mock", module)
mockStory.add("Mock", () => <Mock />, {
  readme: {
    sidebar: readmeCleanup(readme),
  },
  jest: ["mock.test.tsx"],
})

mockStory.add("Mock2", () => <Mock test="Some not default text" />)
