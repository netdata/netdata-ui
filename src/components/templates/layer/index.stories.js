import React, { useState } from "react"
import { useToggle } from "react-use"
import { storiesOf } from "@storybook/react"
import { readmeCleanup } from "utils/readme"
import { H2, H3, Text } from "src/components/typography"
import { Icon } from "src/components/icon"
import { Button } from "src/components/button"
import Flex from "src/components/templates/flex"
// @ts-ignore
import readme from "./README.md"
import Layer from "./index"

const subData = {
  readme: {
    sidebar: readmeCleanup(readme),
  },
  jest: ["index.test.js"],
}

const story = storiesOf("COMPONENTS|Templates/Layer", module)

story.add(
  "Simple",
  () => {
    return (
      <Flex background="mainBackgroundDisabled" width="100vw" height="100vh">
        <Layer>
          <Flex background="mainBackground" round border padding={[4]}>
            Hello world
          </Flex>
        </Layer>
      </Flex>
    )
  },
  subData
)

const positions = [
  "top-left",
  "top",
  "top-right",
  "left",
  "center",
  "right",
  "bottom-left",
  "bottom",
  "bottom-right",
]

story.add(
  "Positions",
  () => {
    return (
      <Flex background="mainBackgroundDisabled" width="100vw" height="100vh">
        {positions.map(position => (
          <Layer key={position} position={position} backdrop={false}>
            <Flex background="mainBackground" width="140px" round border padding={[4]}>
              {position}
            </Flex>
          </Layer>
        ))}
      </Flex>
    )
  },
  subData
)

story.add(
  "Full horizontal",
  () => {
    const fullPositions = ["top", "center", "bottom"]

    return (
      <Flex background="mainBackgroundDisabled" width="100vw" height="100vh">
        {fullPositions.map(position => (
          <Layer key={position} position={position} full="horizontal" backdrop={false}>
            <Flex background="mainBackground" flex round border padding={[4]}>
              {position}
            </Flex>
          </Layer>
        ))}
      </Flex>
    )
  },
  subData
)

story.add(
  "Full vertical",
  () => {
    const fullPositions = ["left", "center", "right"]

    return (
      <Flex background="mainBackgroundDisabled" width="100vw" height="100vh">
        {fullPositions.map(position => (
          <Layer key={position} position={position} full="vertical" backdrop={false}>
            <Flex background="mainBackground" round border padding={[4]}>
              {position}
            </Flex>
          </Layer>
        ))}
      </Flex>
    )
  },
  subData
)

story.add(
  "Full",
  () => {
    return (
      <Flex background="mainBackgroundDisabled" width="100vw" height="100vh">
        <Layer full>
          <Flex background="mainBackground" flex round border padding={[4]}>
            Entire page
          </Flex>
        </Layer>
      </Flex>
    )
  },
  subData
)

story.add(
  "Full margin",
  () => {
    return (
      <Flex background="mainBackgroundDisabled" width="100vw" height="100vh">
        <Layer full margin={[4, 8]}>
          <Flex background="mainBackground" flex round border padding={[4]}>
            Full with vertical and horizontal margin
          </Flex>
        </Layer>
      </Flex>
    )
  },
  subData
)

story.add(
  "Right sidebar",
  () => {
    const [open, toggle] = useToggle(true)
    return (
      <Flex background="mainBackgroundDisabled" width="100vw" height="100vh">
        <Button label={`${open ? "hide" : "show"} sidebar`} onClick={toggle} />
        {open && (
          <Layer full="vertical" position="right" shadow onClickOutside={toggle}>
            <Flex background="mainBackground" flex padding={[4]} column width="50vw">
              <H2>This is a sidebar</H2>
              <Flex column overflow="auto" padding={[2, 0, 0]} gap={1} border={{ side: "top" }}>
                {[...Array(500)].map((v, i) => (
                  <Text key={i}>item {i}</Text>
                ))}
              </Flex>
            </Flex>
          </Layer>
        )}
      </Flex>
    )
  },
  subData
)

story.add(
  "Notification",
  () => {
    const [open, toggle] = useToggle(true)
    return (
      <Flex background="mainBackgroundDisabled" width="100vw" height="100vh">
        <Button label={`${open ? "hide" : "show"} notification`} onClick={toggle} />
        {open && (
          <Layer position="bottom" backdrop={false} margin={[4]}>
            <Flex background="mainBackground" border alignItems="center">
              <Flex padding={[4]} gap={2}>
                <Icon name="alarm" />
                <Text>Lorem Ipsum is simply dummy text</Text>
              </Flex>
              <Icon
                onClick={toggle}
                margin={[2, 2, 0, 0]}
                name="x"
                width="16"
                height="16"
                alignSelf="start"
              />
            </Flex>
          </Layer>
        )}
      </Flex>
    )
  },
  subData
)

story.add(
  "Modal",
  () => {
    const [open, toggle] = useToggle(true)
    return (
      <Flex background="mainBackgroundDisabled" width="100vw" height="100vh">
        <Button label={`${open ? "hide" : "show"} modal`} onClick={toggle} />
        {open && (
          <Layer>
            <Flex
              background="mainBackground"
              height={{ min: 60 }}
              width={{ min: 100 }}
              round
              border
              column
            >
              <Flex justifyContent="between">
                <H3 margin={[4, 0, 0, 4]}>Modal title</H3>
                <Icon onClick={toggle} margin={[2, 2, 0, 0]} name="x" alignSelf="start" />
              </Flex>
              <Flex flex column padding={[4]}>
                <Text>This is the modal content</Text>
              </Flex>
              <Flex padding={[4]} justifyContent="end">
                <Button label="ok" onClick={toggle} />
              </Flex>
            </Flex>
          </Layer>
        )}
      </Flex>
    )
  },
  subData
)
