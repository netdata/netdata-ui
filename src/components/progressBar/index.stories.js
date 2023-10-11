import React from "react"
import Flex from "@/components/templates/flex"
import ProgressBar from "."

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

export const Base = { component: Default }
export const BaseWithValue = { component: WithValue }

export default {
  component: ProgressBar,
}
