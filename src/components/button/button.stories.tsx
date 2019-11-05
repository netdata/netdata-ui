import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { text, boolean, select } from "@storybook/addon-knobs"
import { readmeCleanup } from "../../../utils/readme"
import { Button } from "."

// @ts-ignore
import readme from "./README.md"
import { ButtonType } from "./button"
import { iconsList } from "../icon"

const buttonStory = storiesOf("COMPONENTS|Controls/Button", module)
const icons: string[] = Object.keys(iconsList)

const subData = {
  readme: {
    sidebar: readmeCleanup(readme),
  },
  jest: ["button.test.tsx"],
}

buttonStory.add(
  "Button Default",
  () => (
    <Button
      disabled={boolean("Disabled", false)}
      label={text("Label prop", "LABEL")}
      onClick={action("clicked")}
    />
  ),
  subData
)

buttonStory.add(
  "Button No Fill",
  () => (
    <Button
      disabled={boolean("Disabled", false)}
      type={ButtonType.noFill}
      onClick={action("clicked")}
      label={text("Label", "LABEL")}
    />
  ),
  subData
)

buttonStory.add(
  "Button Borderless",
  () => (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#1a1a1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Button
        disabled={boolean("Disabled", false)}
        type={ButtonType.borderless}
        onClick={action("clicked")}
        label={text("Label", "LABEL")}
      />
    </div>
  ),
  subData
)

buttonStory.add(
  "Button Icon Borderless",
  () => (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#1a1a1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Button
        icon={select("name", icons, "plus")}
        disabled={boolean("Disabled", false)}
        type={ButtonType.borderless}
        onClick={action("clicked")}
        label={text("Label", "LABEL")}
      />
    </div>
  ),
  subData
)

buttonStory.add(
  "Button Icon",
  () => (
    <Button
      icon={select("name", icons, "plus")}
      disabled={boolean("Disabled", false)}
      onClick={action("clicked")}
      label={text("Label", "LABEL")}
    />
  ),
  subData
)

buttonStory.add(
  "Button Icon No Fill",
  () => (
    <Button
      icon={select("name", icons, "plus")}
      disabled={boolean("Disabled", false)}
      type={ButtonType.noFill}
      onClick={action("clicked")}
      label={text("Label", "LABEL")}
    />
  ),
  subData
)

buttonStory.add(
  "Button Action",
  () => (
    <Button
      icon={select("name", icons, "plus")}
      disabled={boolean("Disabled", false)}
      onClick={action("clicked")}
    />
  ),
  subData
)

buttonStory.add(
  "Button Action No Fill",
  () => (
    <Button
      icon={select("name", icons, "plus")}
      disabled={boolean("Disabled", false)}
      onClick={action("clicked")}
      type={ButtonType.noFill}
    />
  ),
  subData
)
