import React from "react"
import { Text } from "@/components/typography"
import Box from "."

export const Positions = () => (
  <Box position="relative" width="500px" height="500px" border={{ size: "1px", side: "all" }}>
    <Box position="absolute" top="5px" right="5px">
      {" "}
      Look at me i a positioned with absolute
    </Box>
    <Box position="fixed" top="5px" right="5px">
      <Box> Look at me i a positioned with fixed</Box>
    </Box>
  </Box>
)

export const As = () => (
  <Box position="relative" width="500px" height="500px" border={{ size: "1px", side: "all" }}>
    <Box as={Text} position="absolute" left="25px" top="25px">
      Look at me i am text inside a box also i inheretit everything from box
    </Box>
  </Box>
)

export const SX = () => (
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
)

export default {
  component: Box,
}
