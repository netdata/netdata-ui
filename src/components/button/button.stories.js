import React, { useState } from "react"
import styled from "styled-components"
import { action } from "@storybook/addon-actions"
import { text, boolean, select } from "@storybook/addon-knobs"
import { Button, IconButton, ButtonGroup } from "."
import { iconsList } from "src/components/icon"

const icons = Object.keys(iconsList)

export const BaseButton = {
  component: () => (
    <Button
      label={text("Label", "LABEL")}
      icon={select("Name", ["No icon", ...icons], "plus")}
      disabled={boolean("Disabled", false)}
      onClick={action("clicked")}
      flavour={select("Flavour", ["default", "hollow", "borderless"], "default")}
      danger={boolean("Danger", false)}
      warning={boolean("Warning", false)}
      small={boolean("Small (works when icon only)", false)}
      isLoading={boolean("Is loading", false)}
      loadingLabel={text("Loading label prop", "LOADING...")}
    />
  ),
}

const DarkBackground = styled.div`
  background-color: black;
  height: 50vh;
  width: 50vw;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ButtonOnDarkBackground = {
  component: () => (
    <DarkBackground>
      <Button
        label={text("Label", "LABEL")}
        icon={select("Name", ["No icon", ...icons], "plus")}
        disabled={boolean("Disabled", false)}
        onClick={action("clicked")}
        flavour={select("Flavour", ["default", "hollow", "borderless"], "default")}
        danger={boolean("Danger", false)}
        warning={boolean("Warning", false)}
        small={boolean("Small (works when icon only)", false)}
        isLoading={boolean("Is loading", false)}
        loadingLabel={text("Loading label prop", "LOADING...")}
      />
    </DarkBackground>
  ),
}

const OverridedButton = styled(Button)`
  background-color: black;
  color: purple;
`

export const ButtonWithCSSOverride = {
  component: () => (
    <OverridedButton
      label={text("Label", "LABEL")}
      icon={select("Name", ["No icon", ...icons], "plus")}
      disabled={boolean("Disabled", false)}
      onClick={action("clicked")}
      flavour={select("Flavour", ["default", "hollow", "borderless"], "default")}
      danger={boolean("Danger", false)}
      warning={boolean("Warning", false)}
      small={boolean("Small (works when icon only)", false)}
      isLoading={boolean("Is loading", false)}
      loadingLabel={text("Loading label prop", "LOADING...")}
    />
  ),
}

export const BaseIconButton = {
  component: () => (
    <IconButton cursor="pointer" icon="chevron_left" iconSize="small" tooltip="Previous" />
  ),
}

export const BaseButtonGroup = {
  component: () => (
    <ButtonGroup>
      <Button label="One" />
      <Button label="Two" />
      <Button label="Three" />
    </ButtonGroup>
  ),
}

const radioButtonItems = [
  { label: "One", value: 1 },
  { label: "Two", value: 2 },
  { label: "Three", value: 3 },
]

export const RadioButtonGroup = {
  component: () => () => {
    const [checked, setChecked] = useState(1)
    const onChange = value => setChecked(value)

    return <ButtonGroup items={radioButtonItems} checked={checked} onChange={onChange} />
  },
}

export default {
  component: Button,
}
