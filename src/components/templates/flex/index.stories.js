import { H4, Text, TextSmall } from "@/components/typography"
import Flex from "."

const FlexCard = () => (
  <Flex
    height="260px"
    width={{ max: "220px" }}
    background="disabled"
    padding={[4]}
    margin={[0, 0, 4, 0]}
    gap={4}
    round
    column
  >
    <Flex basis="50%" background="placeholder" />
    <H4 as="span">This is a card title</H4>
    <Text>This is a card description that contains useful information</Text>
    <TextSmall>April, 1997</TextSmall>
  </Flex>
)

export const Card = () => (
  <Flex gap={4} flexWrap>
    {[...Array(6)].map((value, index) => (
      <FlexCard key={index.toString()} />
    ))}
  </Flex>
)

export const List = () => (
  <Flex column gap={1} width={{ min: "400px" }}>
    <Flex background="textFocus" padding={[1, 2]}>
      First box
    </Flex>
    <Flex background="separator" padding={[1, 2]}>
      Second box
    </Flex>
    <Flex background="placeholder" padding={[1, 2]}>
      Third box
    </Flex>
  </Flex>
)

export const Header = () => (
  <Flex
    as="header"
    justifyContent="between"
    background="disabled"
    padding={[4]}
    margin={[0, 0, 4, 0]}
    width={{ min: "500px" }}
  >
    <H4 as="span">Netdata</H4>
    <Text>Options</Text>
  </Flex>
)

const Item = ({ children, ...rest }) => (
  <Flex background="elementBackground" padding={[1, 3]} round {...rest}>
    <Text>{children}</Text>
  </Flex>
)

export const Directions = () => (
  <Flex column gap={4}>
    <Flex gap={2}>
      <Item>row</Item>
      <Item>system.cpu</Item>
    </Flex>
    <Flex gap={2} rowReverse>
      <Item>rowReverse</Item>
      <Item>system.cpu</Item>
    </Flex>
    <Flex gap={2} column alignItems="start">
      <Item>column</Item>
      <Item>system.cpu</Item>
    </Flex>
    <Flex gap={2} columnReverse alignItems="start">
      <Item>columnReverse</Item>
      <Item>system.cpu</Item>
    </Flex>
  </Flex>
)

export const Alignment = () => (
  <Flex column gap={4} width="400px">
    {["start", "center", "end", "between", "around", "evenly"].map(value => (
      <Flex key={value} column gap={1}>
        <TextSmall color="textLite">{`justifyContent="${value}"`}</TextSmall>
        <Flex justifyContent={value} border padding={[1]} round>
          <Item>cpu</Item>
          <Item>ram</Item>
        </Flex>
      </Flex>
    ))}
    <Flex height="80px" alignItems="center" border padding={[1]} round>
      <Item>alignItems center</Item>
    </Flex>
  </Flex>
)

export const GrowAndWrap = () => (
  <Flex column gap={4} width="420px">
    <Flex gap={2}>
      <Item flex>flex</Item>
      <Item>fixed</Item>
    </Flex>
    <Flex gap={2} flexWrap>
      {["system.cpu", "system.ram", "disk.io", "net.eth0", "apps.mem", "users.cpu"].map(name => (
        <Item key={name}>{name}</Item>
      ))}
    </Flex>
  </Flex>
)

const prop = (description, type, defaultValue, control) => ({
  description,
  control,
  table: { type: { summary: type }, defaultValue: { summary: defaultValue } },
})

export default {
  title: "Components/Templates/Flex",
  component: Flex,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The base layout primitive: a div with display flex and theme-aware props for direction, alignment, gap, spacing, size, border, radius and colour. Use it instead of hand-written CSS for stacks and rows.",
      },
    },
  },
  argTypes: {
    column: prop("Stack children vertically.", "boolean", "false", "boolean"),
    columnReverse: prop("Stack vertically in reverse order.", "boolean", "false", "boolean"),
    rowReverse: prop("Lay out horizontally in reverse order.", "boolean", "false", "boolean"),
    flex: prop(
      "Flex shorthand. true is 1 1, false is 0 0, 'grow' 1 0, 'shrink' 0 1, a number is the grow factor.",
      "boolean | 'grow' | 'shrink' | number | object",
      "undefined",
      "object"
    ),
    basis: prop("Flex basis.", "string", "undefined", "text"),
    flexWrap: prop(
      "Wrap children. 'reverse' wraps in reverse.",
      "boolean | 'reverse'",
      "undefined",
      { type: "select", options: [undefined, true, false, "reverse"] }
    ),
    alignItems: prop("Cross-axis alignment.", "string", "undefined", {
      type: "select",
      options: ["start", "center", "end", "baseline", "stretch"],
    }),
    alignContent: prop("Alignment of wrapped lines.", "string", "undefined", {
      type: "select",
      options: ["start", "center", "end", "between", "around", "stretch"],
    }),
    justifyContent: prop("Main-axis alignment.", "string", "undefined", {
      type: "select",
      options: ["start", "center", "end", "between", "around", "evenly", "stretch"],
    }),
    alignSelf: prop("Cross-axis alignment of this item.", "string", "undefined", "text"),
    gap: prop(
      "Space between children, in theme units (4px each). A string is used as is.",
      "number | string",
      "undefined",
      "number"
    ),
    gapY: prop("Row gap, in theme units.", "number | string", "undefined", "number"),
    padding: prop(
      "Padding in theme units, CSS shorthand order.",
      "number[]",
      "undefined",
      "object"
    ),
    margin: prop("Margin in theme units, CSS shorthand order.", "number[]", "undefined", "object"),
    width: prop(
      "Width. Number is theme units; an object sets { base, min, max }.",
      "number | string | object",
      "undefined",
      "text"
    ),
    height: prop("Height. Same forms as width.", "number | string | object", "undefined", "text"),
    overflow: prop(
      "Overflow. A string, or { vertical, horizontal }.",
      "string | object",
      "undefined",
      "text"
    ),
    background: prop("Theme colour key.", "string", "undefined", "text"),
    color: prop("Text colour, a theme colour key.", "string", "undefined", "text"),
    border: prop(
      "true for a 1px border, or { side, size, type, color }.",
      "boolean | string | object",
      "undefined",
      "object"
    ),
    round: prop(
      "Radius. true is 4px, a number is theme units, or { side, size }.",
      "boolean | number | string | object",
      "undefined",
      "object"
    ),
    opacity: prop("Opacity.", "number", "undefined", "number"),
    position: prop("CSS position.", "string", "undefined", "text"),
    zIndex: prop("CSS z-index.", "number", "undefined", "number"),
    cursor: prop("CSS cursor.", "string", "undefined", "text"),
    as: prop("Render as another element or component.", "ElementType", '"div"', "text"),
    sx: prop("Styled-system style object for one-off overrides.", "object", "undefined", "object"),
  },
}
