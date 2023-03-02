import React, { useState } from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { boolean } from "@storybook/addon-knobs"
import { readmeCleanup } from "utils/readme"
import Flex from "src/components/templates/flex"
import Tooltip from "src/components/drops/tooltip"
import { Button } from "src/components/button"
import { Icon } from "src/components/icon"
import readme from "./README.md"
import Menu from "./index"

const story = storiesOf("Drops/Menu", module)

const subData = {
  readme: {
    sidebar: readmeCleanup(readme),
  },
  jest: ["index.test.js"],
}

const Simple = props => (
  <Menu
    dropTitle="Fight Club characters"
    dropTitlePadding={[2]}
    label="Character"
    items={[
      { value: "narrator", label: "The Narrator", onClick: action("narrator") },
      { value: "durgen", label: "Tyler Durden", onClick: action("durgen") },
      { value: "singer", label: "Marla Singer", onClick: action("singer") },
    ]}
    {...props}
  />
)

story.add(
  "Simple",
  () => (
    <Simple
      onOpen={action("open")}
      onClose={action("close")}
      caret={boolean("caret", true)}
      icon={boolean("icon", false) && <Icon name="add_user" />}
    />
  ),
  subData
)

story.add(
  "Controlled",
  () => {
    const [value, setValue] = useState("durgen")
    return <Simple onChange={setValue} value={value} label={value} />
  },
  subData
)

const ItemButton = ({ item, onItemClick }) => (
  <Button key={item.value} label={item.label} onClick={onItemClick} />
)
story.add(
  "Render item",
  () => <Simple onOpen={action("open")} onClose={action("close")} Item={ItemButton} />,
  subData
)

story.add(
  "Render dropdown",
  () => (
    <Simple
      Dropdown={({ value, onItemClick, items, Item }) => (
        <Flex background="mainBackgroundDisabled" padding={[2]}>
          Characters are: {items.map(({ value }) => value).join(", ")}
        </Flex>
      )}
    />
  ),
  subData
)

story.add(
  "Render menu button",
  () => (
    <Simple>
      <Button label="characters" />
    </Simple>
  ),
  subData
)

story.add(
  "Aligns",
  () => (
    <Flex gap={4} alignItems="start" column>
      <Menu
        border
        label="Large Dropdown (right)"
        items={[
          {
            value: "narrator",
            label: "The Narrator character of the movie",
            onClick: action("narrator"),
          },
          { value: "durgen", label: "Tyler Durden", onClick: action("durgen") },
          { value: "singer", label: "Marla Singer", onClick: action("singer") },
        ]}
        dropProps={{ align: { top: "bottom", right: "right" } }}
      />
      <Menu
        border
        label="Large Dropdown"
        items={[
          {
            value: "narrator",
            label: "The Narrator character of the movie",
            onClick: action("narrator"),
          },
          { value: "durgen", label: "Tyler Durden", onClick: action("durgen") },
          { value: "singer", label: "Marla Singer", onClick: action("singer") },
        ]}
      />
      <Menu
        border
        label="The is a very large label (right)"
        items={[
          { value: "narrator", label: "The Narrator", onClick: action("narrator") },
          { value: "durgen", label: "Tyler Durden", onClick: action("durgen") },
          { value: "singer", label: "Marla Singer", onClick: action("singer") },
        ]}
        dropProps={{ align: { top: "bottom", right: "right" } }}
      />
      <Menu
        border
        label="The is a very large label"
        items={[
          { value: "narrator", label: "The Narrator", onClick: action("narrator") },
          { value: "durgen", label: "Tyler Durden", onClick: action("durgen") },
          { value: "singer", label: "Marla Singer", onClick: action("singer") },
        ]}
      />
    </Flex>
  ),
  subData
)

story.add(
  "With tooltip",
  () => (
    <Flex gap={4} column>
      <Tooltip align="top" content="Menu tooltip">
        <Menu
          label="Tooltip with menu"
          items={[
            { value: "narrator", label: "The Narrator", onClick: action("narrator") },
            { value: "durgen", label: "Tyler Durden", onClick: action("durgen") },
            { value: "singer", label: "Marla Singer", onClick: action("singer") },
          ]}
        />
      </Tooltip>

      <Menu
        items={[
          { value: "narrator", label: "The Narrator", onClick: action("narrator") },
          { value: "durgen", label: "Tyler Durden", onClick: action("durgen") },
          { value: "singer", label: "Marla Singer", onClick: action("singer") },
        ]}
      >
        <Tooltip align="top" content="Menu tooltip">
          Menu with tooltip
        </Tooltip>
      </Menu>
    </Flex>
  ),
  subData
)
