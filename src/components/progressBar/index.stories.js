import React from "react"
import { storiesOf } from "@storybook/react"
import Flex from "src/components/templates/flex"
import ProgressBar from "."

const story = storiesOf("Atoms/ProgressBar", module)

const Default = () => (
  <Flex width="300px">
    <ProgressBar width="80%" color={["blue", "aquamarine"]} background={["purple", "lilac"]} />
  </Flex>
)

const WithValue = () => (
  <Flex width="300px">
    <ProgressBar
      value={[
        { color: ["blue", "indigo"], width: "20%" },
        { color: ["green", "limeGreen"], width: "60%" },
      ]}
      background={["yellow", "seaBuckthorn"]}
    />
  </Flex>
)

story.add("Default", Default)
story.add("WithValue", WithValue)
