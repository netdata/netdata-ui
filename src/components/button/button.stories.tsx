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
  "Button",
  () => (
    <Button
      label={text("Label", "LABEL")}
      icon={select("Name", ["No icon", ...icons], "plus")}
      disabled={boolean("Disabled", false)}
      onClick={action("clicked")}
      flavor={select("Name", ["default", "hollow", "borderless"], "default")}
      danger={boolean("Danger", false)}
      warning={boolean("Warning", false)}
      small={boolean("Small (works when icon only)", false)}
      isLoading={boolean("Is loading", false)}
      loadingLabel={text("Loading label prop", "LOADING...")}
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
      label={text("Label", "LABEL")}
      icon={select("Name", ["No icon", ...icons], "plus")}
      disabled={boolean("Disabled", false)}
      onClick={action("clicked")}
      flavor={select("Name", ["default", "hollow", "borderless"], "default")}
      danger={boolean("Danger", false)}
      warning={boolean("Warning", false)}
      small={boolean("Small (works when icon only)", false)}
      isLoading={boolean("Is loading", false)}
      loadingLabel={text("Loading label prop", "LOADING...")}
    />
  ),
  subData
)
