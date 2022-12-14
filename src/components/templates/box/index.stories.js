import React from "react"
import { storiesOf } from "@storybook/react"
import { Text } from "src/components/typography"
import { readmeCleanup } from "utils/readme"
import readme from "./README.md"

import Box from "./index"

const subData = {
  readme: {
    sidebar: readmeCleanup(readme),
  },
}

const flexStory = storiesOf("Templates/Box", module)

flexStory.add(
  "With Different positions",
  () => (
    <Box position="relative" width="500px" height="500px" border={{ size: "1px", side: "all" }}>
      <Box position="absolute" top="5px" right="5px">
        {" "}
        Look at me i a positioned with absolute
      </Box>
      <Box position="fixed" top="5px" right="5px">
        <Box> Look at me i a positioned with fixed</Box>
      </Box>
    </Box>
  ),
  subData
)

flexStory.add(
  "using as prop",
  () => (
    <Box position="relative" width="500px" height="500px" border={{ size: "1px", side: "all" }}>
      <Box as={Text} position="absolute" left="25px" top="25px">
        Look at me i am text inside a box also i inheretit everything from box
      </Box>
    </Box>
  ),
  subData
)
flexStory.add(
  "Styled with sx prop",
  () => (
    <Box
      sx={{
        width: "500px",
        position: "relative",
        height: "500px",
        border: "1px solid black",
        backrground: "red",
      }}
    >
      <Box as={Text} position="absolute" left="25px" top="25px">
        Look at me i am text inside a box also i inheretit everything from box
      </Box>
    </Box>
  ),
  subData
)
