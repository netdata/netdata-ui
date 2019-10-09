import React from "react"
import { storiesOf } from "@storybook/react"
import { readmeCleanup } from "../../utils/readme"
import Mock from "../../src/mock"
// @ts-ignore
import readme from "./README.md"

storiesOf("Mock", module).add("Mock", () => <Mock />, {
  readme: {
    sidebar: readmeCleanup(readme),
  },
  jest: ["mock.test.tsx"],
})

storiesOf("Mock", module).add("Mock2", () => <Mock test="Some not default text" />)
