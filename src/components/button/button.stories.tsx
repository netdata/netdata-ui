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
  "Button Default Danger",
  () => (
    <Button
      disabled={boolean("Disabled", false)}
      label={text("Label prop", "LABEL")}
      onClick={action("clicked")}
      danger={boolean("Danger", true)}
    />
  ),
  subData
)

buttonStory.add(
  "Button Hollow",
  () => (
    <Button
      disabled={boolean("Disabled", false)}
      type="hollow"
      onClick={action("clicked")}
      label={text("Label", "LABEL")}
      danger={boolean("Danger", false)}
    />
  ),
  subData
)

buttonStory.add(
  "Button Hollow Danger",
  () => (
    <Button
      disabled={boolean("Disabled", false)}
      type="hollow"
      onClick={action("clicked")}
      label={text("Label", "LABEL")}
      danger={boolean("Danger", true)}
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
        danger={boolean("Danger", false)}
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
        danger={boolean("Danger", false)}
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
      danger={boolean("Danger", false)}
    />
  ),
  subData
)

buttonStory.add(
  "Button Icon Hollow",
  () => (
    <Button
      icon={select("Name", icons, "plus")}
      disabled={boolean("Disabled", false)}
      type="hollow"
      onClick={action("clicked")}
      label={text("Label", "LABEL")}
      danger={boolean("Danger", false)}
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
      danger={boolean("Danger", false)}
      small={boolean("Small", false)}
    />
  ),
  subData
)

buttonStory.add(
  "Button Action Hollow",
  () => (
    <Button
      icon={select("Name", icons, "plus")}
      disabled={boolean("Disabled", false)}
      onClick={action("clicked")}
      type="hollow"
      danger={boolean("Danger", false)}
      small={boolean("Small", false)}
    />
  ),
  subData
)

buttonStory.add(
  "Button loading",
  () => (
    <Button
      disabled={boolean("Disabled", false)}
      label={text("Label prop", "LABEL")}
      loadingLabel={text("Loading label prop", "LOADING...")}
      onClick={action("clicked")}
      isLoading={boolean("Is loading", true)}
    />
  ),
  subData
)

buttonStory.add(
  "Button with Icon Loading",
  () => (
    <Button
      icon={select("Name", icons, "plus")}
      disabled={boolean("Disabled", false)}
      type="hollow"
      onClick={action("clicked")}
      label={text("Label", "LABEL")}
      loadingLabel={text("Loading label prop", "LOADING...")}
      danger={boolean("Danger", false)}
      isLoading={boolean("Is loading", true)}
    />
  ),
  subData
)

buttonStory.add(
  "Button Action Loading",
  () => (
    <Button
      icon={select("Name", icons, "plus")}
      disabled={boolean("Disabled", false)}
      onClick={action("clicked")}
      type="hollow"
      danger={boolean("Danger", false)}
      isLoading={boolean("Is loading", true)}
    />
  ),
  subData
)

const OverridedButton = styled(Button)`
  background-color: black;
  color: purple;
`

buttonStory.add(
  "Button with CSS override",
  () => (
    <OverridedButton
      icon={select("Name", icons, "plus")}
      disabled={boolean("Disabled", false)}
      onClick={action("clicked")}
      label="The text"
      type="hollow"
    />
  ),
  subData
)
