import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { text } from "@storybook/addon-knobs"
import { readmeCleanup } from "../../../utils/readme"
import Button from "."

// @ts-ignore
import readme from "./README.md"
import { ButtonType } from "./button"

const mockStory = storiesOf("Button", module)

const subData = {
  readme: {
    sidebar: readmeCleanup(readme),
  },
  jest: ["button.test.tsx"],
}

mockStory.add(
  "Button",
  () => {
    return (
      <Button
        type={ButtonType.default}
        label={text("Label prop", "LABEL")}
        onClick={action("clicked")}
      />
    )
  },
  subData
)

mockStory.add(
  "Button Hollow",
  () => (
    <Button
      type={ButtonType.hollow}
      onClick={action("clicked")}
      label={text("Label prop", "LABEL")}
    />
  ),
  subData
)

mockStory.add(
  "Button Disabled",
  () => (
    <Button
      type={ButtonType.disabled}
      onClick={action("clicked")}
      label={text("Label prop", "LABEL")}
    />
  ),
  subData
)

mockStory.add(
  "Button Bordered",
  () => (
    <Button
      type={ButtonType.bordered}
      onClick={action("clicked")}
      label={text("Label prop", "LABEL")}
    />
  ),
  subData
)
