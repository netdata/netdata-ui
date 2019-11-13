import React from "react"
import { storiesOf } from "@storybook/react"
import styled from "styled-components"

import { action } from "@storybook/addon-actions"
import { text, boolean, select } from "@storybook/addon-knobs"
import { readmeCleanup } from "../../../utils/readme"
import { Button } from "."
// @ts-ignore
import readme from "./README.md"
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
      type="noFill"
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
        type="borderless"
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
        icon={select("Name", icons, "plus")}
        disabled={boolean("Disabled", false)}
        type="borderless"
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
      icon={select("Name", icons, "plus")}
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
      icon={select("Name", icons, "plus")}
      disabled={boolean("Disabled", false)}
      type="noFill"
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
      icon={select("Name", icons, "plus")}
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
      icon={select("Name", icons, "plus")}
      disabled={boolean("Disabled", false)}
      onClick={action("clicked")}
      type="noFill"
    />
  ),
  subData
)

const OverridedButton = styled(Button)`
  background-color: black;
  color: purple;
`

buttonStory.add(
  "Button with CSS overriede",
  () => (
    <OverridedButton
      icon={select("Name", icons, "plus")}
      disabled={boolean("Disabled", false)}
      onClick={action("clicked")}
      label="The text"
      type="noFill"
    />
  ),
  subData
)
