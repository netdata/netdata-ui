import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { text, boolean } from "@storybook/addon-knobs"
import { readmeCleanup } from "../../../utils/readme"
import MDXButton from "."

// @ts-ignore
import readme from "./README.md"

const mockStory = storiesOf("Button", module)

const subData = {
  readme: {
    sidebar: readmeCleanup(readme),
  },
  jest: ["mock.test.tsx"],
}

mockStory.add(
  "Button",
  () => {
    return <MDXButton label={text("Text prop", "")} onClick={action("clicked")} />
  },
  subData
)

mockStory.add(
  "Button2",
  () => (
    <MDXButton
      onClick={action("clicked")}
      isLoading={boolean("isLoading prop", true)}
      label={text("Label prop", "Hello loading button")}
    />
  ),
  subData
)
