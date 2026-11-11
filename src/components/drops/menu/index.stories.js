import { useState } from "react"
import Flex from "@/components/templates/flex"
import Tooltip from "@/components/drops/tooltip"
import { Button } from "@/components/button"
import { Icon } from "@/components/icon"
import { Text } from "@/components/typography"
import Menu from "."
import MenuDropdown from "./dropdown"
import DropdownItem from "./dropdownItem"

const Simple = props => (
  <Menu
    dropTitle={<Text>Fight Club characters</Text>}
    dropTitlePadding={[2]}
    label="Character"
    items={[
      { value: "narrator", label: "The Narrator", onClick: () => alert("narrator") },
      { value: "durgen", label: "Tyler Durden", onClick: () => alert("durgen") },
      { value: "singer", label: "Marla Singer", onClick: () => alert("singer") },
    ]}
    {...props}
  />
)

export const MenuSimple = args => (
  <Simple
    onOpen={() => alert("open")}
    onClose={() => alert("close")}
    {...args}
    icon={args.icon && <Icon name="add_user" />}
  />
)

export const Controlled = {
  render: () => {
    const [value, setValue] = useState("durgen")
    return <Simple onChange={setValue} value={value} label={value} />
  },
}

const ItemButton = ({ item, onItemClick }) => (
  <Button key={item.value} label={item.label} onClick={onItemClick} />
)
export const RenderItem = {
  render: () => (
    <Simple onOpen={() => alert("open")} onClose={() => alert("close")} Item={ItemButton} />
  ),
}

export const RenderDropdown = {
  render: () => (
    <Simple
      Dropdown={({ items }) => (
        <Flex background="mainBackgroundDisabled" padding={[2]}>
          Characters are: {items.map(({ value }) => value).join(", ")}
        </Flex>
      )}
    />
  ),
}

export const RenderMenuButton = {
  render: () => (
    <Simple>
      <Button label="characters" />
    </Simple>
  ),
}

export const RenderDropdownFooter = {
  render: () => (
    <Simple
      onOpen={() => alert("open")}
      onClose={() => alert("close")}
      Footer={() => <Flex>Footer</Flex>}
    />
  ),
}

export const Aligns = {
  render: () => (
    <Flex gap={4} alignItems="start" column>
      <Menu
        border
        label="Large Dropdown (right)"
        items={[
          {
            value: "narrator",
            label: "The Narrator character of the movie",
            onClick: () => alert("narrator"),
          },
          { value: "durgen", label: "Tyler Durden", onClick: () => alert("durgen") },
          { value: "singer", label: "Marla Singer", onClick: () => alert("singer") },
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
            onClick: () => alert("narrator"),
          },
          { value: "durgen", label: "Tyler Durden", onClick: () => alert("durgen") },
          { value: "singer", label: "Marla Singer", onClick: () => alert("singer") },
        ]}
      />
      <Menu
        border
        label="The is a very large label (right)"
        items={[
          { value: "narrator", label: "The Narrator", onClick: () => alert("narrator") },
          { value: "durgen", label: "Tyler Durden", onClick: () => alert("durgen") },
          { value: "singer", label: "Marla Singer", onClick: () => alert("singer") },
        ]}
        dropProps={{ align: { top: "bottom", right: "right" } }}
      />
      <Menu
        border
        label="The is a very large label"
        items={[
          { value: "narrator", label: "The Narrator", onClick: () => alert("narrator") },
          { value: "durgen", label: "Tyler Durden", onClick: () => alert("durgen") },
          { value: "singer", label: "Marla Singer", onClick: () => alert("singer") },
        ]}
      />
    </Flex>
  ),
}

export const WithTooltip = {
  render: () => (
    <Flex gap={4} column>
      <Tooltip align="top" content="Menu tooltip">
        <Menu
          label="Tooltip with menu"
          items={[
            { value: "narrator", label: "The Narrator", onClick: () => alert("narrator") },
            { value: "durgen", label: "Tyler Durden", onClick: () => alert("durgen") },
            { value: "singer", label: "Marla Singer", onClick: () => alert("singer") },
          ]}
        />
      </Tooltip>

      <Menu
        items={[
          { value: "narrator", label: "The Narrator", onClick: () => alert("narrator") },
          { value: "durgen", label: "Tyler Durden", onClick: () => alert("durgen") },
          { value: "singer", label: "Marla Singer", onClick: () => alert("singer") },
        ]}
      >
        <Tooltip align="top" content="Menu tooltip">
          Menu with tooltip
        </Tooltip>
      </Menu>
    </Flex>
  ),
}

const stateItems = [
  { value: "system", label: "System", justDesc: true },
  { value: "cpu", label: "CPU usage", icon: <Icon name="cpu" width="14px" height="14px" /> },
  { value: "load", label: "Load", icon: <Icon name="charts_view" width="14px" height="14px" /> },
  { value: "ram", label: "Memory", icon: <Icon name="ram" width="14px" height="14px" /> },
  {
    value: "disk",
    label: "Disk I/O (disabled)",
    icon: <Icon name="disk" width="14px" height="14px" />,
    disabled: true,
  },
  { value: "network", label: "Network", justDesc: true },
  {
    value: "interfaces",
    label: "Interfaces",
    icon: <Icon name="networkingStack" width="14px" height="14px" />,
  },
  {
    value: "packets",
    label: "Packets (focus hook)",
    icon: <Icon name="networkingStack" width="14px" height="14px" />,
    "data-focused": "true",
  },
]

// Static, always-open dropdowns so every row state can be reviewed side by side in both themes.
export const States = {
  render: () => (
    <Flex gap={6} alignItems="start">
      <Flex width="240px" column>
        <Text>Selected, disabled, section titles, focus hook</Text>
        <MenuDropdown items={stateItems} value="ram" Item={DropdownItem} onItemClick={() => {}} />
      </Flex>
      <Flex width="240px" column>
        <Text>With search</Text>
        <MenuDropdown
          hasSearch
          items={stateItems}
          value="cpu"
          Item={DropdownItem}
          onItemClick={() => {}}
        />
      </Flex>
      <Flex width="240px" column>
        <Text>Without shadow</Text>
        <MenuDropdown hideShadow items={stateItems} Item={DropdownItem} onItemClick={() => {}} />
      </Flex>
    </Flex>
  ),
}

export const WithSearchAndIcons = args => (
  <Menu label="Metric" hasSearch items={stateItems} value="ram" {...args} />
)

export default {
  title: "Components/Drops/Menu",
  component: Menu,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A button that opens a dropdown list of items, or any custom dropdown view. Use it for choosing one value from a list or for a small set of actions.",
      },
    },
  },
  argTypes: {
    items: {
      description:
        "Rows of the dropdown. Each item has value, label and optional icon, disabled, justDesc (section title), reverse and onClick.",
      control: "object",
      table: { type: { summary: "Item[]" } },
    },
    value: {
      description: "Currently selected item value. Selected rows get a green marker.",
      control: "text",
      table: { type: { summary: "string | number" } },
    },
    label: {
      description: "Trigger label. Falls back to the label of the selected item.",
      control: "text",
      table: { type: { summary: "ReactNode" } },
    },
    icon: {
      description: "Icon shown before the label on the default trigger.",
      control: false,
      table: { type: { summary: "JSX.Element" }, defaultValue: { summary: "null" } },
    },
    caret: {
      description: "Show the chevron on the default trigger, or pass your own element.",
      control: "boolean",
      table: { type: { summary: "boolean | JSX.Element" }, defaultValue: { summary: "true" } },
    },
    open: {
      description: "Open the menu on mount.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    closeOnClick: {
      description: "Close the menu after an item is chosen.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "true" } },
    },
    hasSearch: {
      description: "Show a search field above the items.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    dropTitle: {
      description: "Content shown above the items.",
      control: false,
      table: { type: { summary: "ReactNode" } },
    },
    dropTitlePadding: {
      description: "Padding of the title area.",
      control: "object",
      table: { type: { summary: "number[]" }, defaultValue: { summary: "[3, 3, 0]" } },
    },
    animation: {
      description: "Fade and lift the dropdown in. Disabled under reduced motion.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "undefined" } },
    },
    onChange: {
      description: "Called with the item value when an item is chosen.",
      action: "onChange",
      table: { type: { summary: "(value) => void" } },
    },
    onOpen: {
      description: "Called when the menu opens.",
      action: "onOpen",
      table: { type: { summary: "() => void" } },
    },
    onClose: {
      description: "Called when the menu closes.",
      action: "onClose",
      table: { type: { summary: "() => void" } },
    },
    dropProps: {
      description: "Props forwarded to the Drop, such as align.",
      control: "object",
      table: { type: { summary: "DropProps" } },
    },
    dropdownProps: {
      description: "Props forwarded to the Dropdown.",
      control: "object",
      table: { type: { summary: "object" } },
    },
    itemProps: {
      description: "Props forwarded to every item.",
      control: "object",
      table: { type: { summary: "object" } },
    },
    Item: {
      description: "Component that renders one row.",
      control: false,
      table: { type: { summary: "Component" }, defaultValue: { summary: "DropdownItem" } },
    },
    Dropdown: {
      description: "Component that renders the whole dropdown.",
      control: false,
      table: { type: { summary: "Component" }, defaultValue: { summary: "MenuDropdown" } },
    },
    Footer: {
      description: "Component rendered under the items. Receives close.",
      control: false,
      table: { type: { summary: "Component" } },
    },
    children: {
      description: "Custom trigger. It receives onClick, aria-haspopup and aria-expanded.",
      control: false,
      table: { type: { summary: "ReactNode" } },
    },
  },
}
