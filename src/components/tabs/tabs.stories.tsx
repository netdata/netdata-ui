import React, { useState } from "react"
import { storiesOf } from "@storybook/react"

import { action } from "@storybook/addon-actions"
import { text, boolean, select, number } from "@storybook/addon-knobs"
import { readmeCleanup } from "../../../utils/readme"
import { Tabs, Tab } from "."
// @ts-ignore
import readme from "./README.md"

const tabsStory = storiesOf("COMPONENTS|Tabs", module)

const subData = {
  readme: {
    sidebar: readmeCleanup(readme),
  },
  jest: ["tabs.test.tsx"],
}

const makeOnChange = {
  no: undefined,
  yes: action("Tab changed"),
}

const TabContentExample = props => <i>all in italics: {props.children}</i>

const makeTabContentSelect = {
  TabContentExample,
  b: "b",
}

tabsStory.add(
  "Tabs",
  () => {
    const hasOnChange = select("Controlled (onChange)", ["no", "yes"], "no")
    const selectTabContent = select("Tab content wrapper", ["TabContentExample", "b"], "b")

    return (
      <Tabs
        onChange={makeOnChange[hasOnChange]}
        selected={number("Selected tab", 0, { min: 0, max: 3 })}
        TabContent={makeTabContentSelect[selectTabContent]}
      >
        <Tab label={text("Tab label", "LABEL")} disabled={boolean("Tab is disabled", false)}>
          Hello
        </Tab>
        <Tab label="Hi again">Hello again</Tab>
        <Tab label="Bye">Goodbye</Tab>
        <Tab label="Goodbye">Fairwell</Tab>
      </Tabs>
    )
  },
  subData
)

tabsStory.add(
  "Tabs with mocked router",
  () => {
    const [path, setPath] = useState("/a")
    const paths = ["/a", "/b", "/c", "/d"]
    const selected = paths.findIndex(p => p === path)

    return (
      <Tabs
        onChange={index => {
          setPath(paths[index])
        }}
        selected={selected}
      >
        <Tab label="hi">Hello</Tab>
        <Tab disabled label="Hi again">
          Hello again
        </Tab>
        <Tab label="Bye">Goodbye</Tab>
        <Tab label="Goodbye">Fairwell</Tab>
      </Tabs>
    )
  },
  subData
)
