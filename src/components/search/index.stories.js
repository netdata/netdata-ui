import Flex from "@/components/templates/flex"
import { Button } from "@/components/button"
import Search from "."

export const Basic = args => <Search {...args} />

export const States = () => (
  <Flex gap={4} alignItems="start" flexWrap>
    <Flex width="220px">
      <Search placeholder="Search nodes" />
    </Flex>
    <Flex width="220px">
      <Search placeholder="Search nodes" value="nginx" />
    </Flex>
    <Flex width="220px">
      <Search placeholder="Search nodes" disabled />
    </Flex>
  </Flex>
)

export const Sizes = () => (
  <Flex column gap={2} width="260px">
    <Search placeholder="compact (24px)" size="compact" />
    <Search placeholder="default (30px)" />
    <Search placeholder="height={8} (32px)" height={8} />
  </Flex>
)

// Default toolbars are 30px; a page's main search opts into 32px and pairs with a large button.
export const Prominent = () => (
  <Flex gap={2} alignItems="center" width="640px">
    <Flex flex>
      <Search placeholder="Filter by Status, Name, Context…" height={8} />
    </Flex>
    <Button large flavour="hollow" icon="alarm_bell" label="New alert" />
  </Flex>
)

const t = (summary, def) => ({ type: { summary }, defaultValue: { summary: def } })

export default {
  title: "Components/Search",
  component: Search,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A search field with a leading search icon and a clear button, built on TextInput. onChange fires 300ms after the user stops typing.",
      },
    },
  },
  args: {
    placeholder: "Search",
    value: "",
  },
  argTypes: {
    value: { description: "Initial value; the field keeps its own state after that.", table: t("string", '""'), control: "text" },
    placeholder: { description: "Text shown while the field is empty.", table: t("string", "undefined"), control: "text" },
    reset: { description: "When it becomes truthy, the field clears.", table: t("boolean", "undefined"), control: "boolean" },
    onChange: { description: "Called with the string value, debounced by 300ms.", table: t("(value: string) => void", "undefined"), action: "onChange" },
    onReset: { description: "Called when the clear button is clicked.", table: t("() => void", "undefined"), action: "onReset" },
    size: { description: "Passed to TextInput: compact (or tiny) is 24px; the default is 30px.", table: t('"compact" | "small"', '"small"'), control: { type: "radio" }, options: ["compact", "small"] },
    height: { description: "Height override in 4px units; height={8} is the 32px prominent search.", table: t("number", "undefined"), control: "number" },
    disabled: { description: "Passed to TextInput; fades the field to 40%.", table: t("boolean", "undefined"), control: "boolean" },
  },
}
