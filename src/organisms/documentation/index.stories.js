import React, { useState } from "react"
import { storiesOf } from "@storybook/react"
import { readmeCleanup } from "utils/readme"
import Flex from "src/components/templates/flex"
import { Button } from "src/components/button"
// @ts-ignore
import readme from "./README.md"
import Documentation from "./index"

const subData = {
  readme: {
    sidebar: readmeCleanup(readme),
  },
  jest: ["index.test.js"],
}

const story = storiesOf("ORGANISMS|Documentation/Documentation", module)

story.add(
  "Cloud Documentation",
  () => {
    return (
      <Flex background="mainBackgroundDisabled" gap={4} width="100vw" height="100vh">
        <Documentation app="cloud">
          {(toggle, isOpen) => (
            <Button
              width="auto"
              onClick={toggle}
              label={`${isOpen ? "hide" : "show"} cloud documentation modal`}
            />
          )}
        </Documentation>
        <Documentation app="agent">
          {(toggle, isOpen) => (
            <Button
              width="auto"
              onClick={toggle}
              label={`${isOpen ? "hide" : "show"} agent documentation modal`}
            />
          )}
        </Documentation>
      </Flex>
    )
  },
  subData
)
