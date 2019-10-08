import React from "react"
import { storiesOf } from "@storybook/react"
import Mock from "../../src/mock"
// @ts-ignore
import readme from "./README.md"

storiesOf("Mock", module).add(
  "Mock",
  (): JSX.Element => (
    <>
      <Mock />
    </>
  ),
  {
    readme: {
      sidebar: readme,
    },
  }
)

storiesOf("Mock", module).add(
  "Mock2",
  (): JSX.Element => (
    <>
      <Mock test="Some not default text" />
    </>
  )
)
