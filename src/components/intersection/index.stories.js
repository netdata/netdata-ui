import React from "react"
import { storiesOf } from "@storybook/react"
import { readmeCleanup } from "utils/readme"
import Flex from "src/components/templates/flex"
import readme from "./README.md"
import Intersection from "./index"

const story = storiesOf("COMPONENTS|Intersection", module)

const subData = {
  readme: {
    sidebar: readmeCleanup(readme),
  },
  jest: ["index.test.js"],
}

story.add(
  "Simple",
  () => (
    <Flex height="3000px" column>
      <Intersection fallback="visible outside the viewport" padding={[8, 15]} border>
        Visible inside the viewport. Scroll down and see the inspect element
      </Intersection>
    </Flex>
  ),
  subData
)
