import { Button } from "@/components/button"
import Flex from "@/components/templates/flex"
import {
  H0,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  TextHuge,
  TextBigger,
  TextBig,
  Text,
  TextSmall,
  TextMicro,
  TextNano,
  TextFemto,
  List,
  ListItem,
} from "."

const headers = (
  <div>
    <H0>H0: Title Enormous. The five boxing wizards jump quickly.</H0>
    <H1>H1: Title Huge. The five boxing wizards jump quickly.</H1>
    <H2>H2: Title Bigger. The five boxing wizards jump quickly.</H2>
    <H3>H3: Title Big. The five boxing wizards jump quickly.</H3>
    <H4>H4: Title Regular. The five boxing wizards jump quickly.</H4>
    <H5>H5: Title Small. The five boxing wizards jump quickly.</H5>
    <H6>H6: Title Big. The five boxing wizards jump quickly.</H6>
  </div>
)

const texts = (
  <div>
    <div>
      <TextHuge>TextHuge: The five boxing wizards jump quickly.</TextHuge>
    </div>
    <div>
      <TextBigger>TextBigger: The five boxing wizards jump quickly.</TextBigger>
    </div>
    <div>
      <TextBig>TextBig: The five boxing wizards jump quickly.</TextBig>
    </div>
    <div>
      <Text>Text: (Regular) The five boxing wizards jump quickly.</Text>
    </div>
    <div>
      <TextSmall>TextSmall: The five boxing wizards jump quickly.</TextSmall>
    </div>
    <div>
      <TextMicro>TextMicro: The five boxing wizards jump quickly.</TextMicro>
    </div>
    <div>
      <TextNano>TextNano: The five boxing wizards jump quickly.</TextNano>
    </div>
    <div>
      <TextFemto>TextFemto: The five boxing wizards jump quickly.</TextFemto>
    </div>
  </div>
)

const controls = (
  <>
    <Button label="Button" />
  </>
)

export const Typography = () => (
  <Flex column gap={6} padding={[4]}>
    {headers}
    {texts}
    {controls}
  </Flex>
)

export const Weights = () => (
  <div>
    <div>
      <Text>Text regular 400</Text>
    </div>
    <div>
      <Text strong>Text strong 600</Text>
    </div>
    <H4>H4 heading 600</H4>
    <H4 strong={false}>H4 strong=false 400</H4>
  </div>
)

export const BaseList = () => (
  <List style={{ width: "284px" }}>
    <ListItem>My list item 1</ListItem>
    <ListItem>My list item 2 and my list item 2-2</ListItem>
    <ListItem>My list item 3</ListItem>
    <ListItem>My list item 4</ListItem>
  </List>
)

export const Colors = () => (
  <Flex column gap={1}>
    <Text>text (default): system.cpu is steady</Text>
    <Text color="textLite">textLite: last collected 3 seconds ago</Text>
    <Text color="primary">primary: 12 nodes live</Text>
    <Text color="warning">warning: disk space below 20%</Text>
    <Text color="error">error: node unreachable</Text>
  </Flex>
)

export const Modifiers = () => (
  <Flex column gap={2} width="320px">
    <Text truncate>truncate: a very long alert name that does not fit on a single line</Text>
    <Text textTransform="uppercase">uppercase: critical</Text>
    <Text textTransform="capitalize">capitalize: web server latency</Text>
    <Text textAlign="center">textAlign center</Text>
    <Text textDecoration="underline">textDecoration underline</Text>
    <Text code>system.cpu</Text>
    <Text opacity={0.5}>opacity 0.5</Text>
  </Flex>
)

export const Playground = args => <Text {...args} />

Playground.args = { children: "The five boxing wizards jump quickly." }

const colorHint = "Theme colour key."

export default {
  title: "Components/Typography",
  component: Text,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Text and heading components (H0 to H6, TextHuge to TextFemto) plus List and ListItem. Use them instead of raw tags so size, line height, weight and colour follow the theme.",
      },
    },
  },
  argTypes: {
    children: {
      description: "Text content.",
      control: "text",
      table: { type: { summary: "ReactNode" } },
    },
    strong: {
      description: "Bold (600) text. Headings are strong by default; set false for regular weight.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false (true for H0 to H6)" } },
    },
    color: {
      description: colorHint,
      control: "text",
      table: { type: { summary: "string | string[]" }, defaultValue: { summary: "text" } },
    },
    truncate: {
      description: "Single line with an ellipsis when the text overflows.",
      control: "boolean",
      table: { type: { summary: "boolean" } },
    },
    code: {
      description: "Inline code look with a padded, rounded background.",
      control: "boolean",
      table: { type: { summary: "boolean" } },
    },
    textAlign: {
      description: "Text alignment.",
      options: ["left", "center", "right"],
      control: { type: "select" },
      table: { type: { summary: "left | center | right" } },
    },
    textDecoration: {
      description: "Text decoration.",
      options: ["none", "underline", "line-through"],
      control: { type: "select" },
      table: { type: { summary: "none | underline | line-through" } },
    },
    textTransform: {
      description: "Text transform.",
      options: ["none", "capitalize", "uppercase", "lowercase", "firstLetter"],
      control: { type: "select" },
      table: {
        type: { summary: "none | capitalize | uppercase | lowercase | firstLetter" },
        defaultValue: { summary: "none" },
      },
    },
    whiteSpace: {
      description: "White space handling.",
      options: ["normal", "nowrap", "pre-line", "pre-wrap"],
      control: { type: "select" },
      table: { type: { summary: "normal | nowrap | pre-line | pre-wrap" } },
    },
    wordBreak: {
      description: "Word break behaviour.",
      options: ["normal", "break-all", "keep-all", "break-word"],
      control: { type: "select" },
      table: { type: { summary: "normal | break-all | keep-all | break-word" } },
    },
    opacity: {
      description: "Opacity from 0 to 1.",
      control: { type: "number", min: 0, max: 1, step: 0.1 },
      table: { type: { summary: "number" } },
    },
    fontSize: {
      description: "Overrides font size and line height with the same value.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    lineHeight: {
      description: "Overrides line height.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    background: {
      description: "Theme colour key for the background when code is set.",
      control: "text",
      table: { type: { summary: "string" }, defaultValue: { summary: "text" } },
    },
    as: {
      description: "Renders another element or component.",
      control: false,
      table: { type: { summary: "ElementType" }, defaultValue: { summary: "span (h1 to h6 for headings)" } },
    },
  },
}
